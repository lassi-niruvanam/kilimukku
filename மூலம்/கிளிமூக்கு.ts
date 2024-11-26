import { v4 as uuidv4 } from "uuid";
import type { Constellation, tableaux, types } from "@constl/ipa";
import type { அங்கீகரிக்கப்பட்ட_உறுப்படி_வகை } from "@lassi-js/kili";

import { uneFois as ஒருமுறை, attendreStabilité } from "@constl/utils-ipa";
import { கிளி } from "@lassi-js/kili";
import {
  சாபி_நெடுவரிசை_அடையாளம்,
  இலக்கு_மொழி_நெடுவரிசை_அடையாளம்,
  மூல்_மொழி_நெடுவரிசை_அடையாளம்,
  மூல்_உரை_நெடுவரிசை_அடையாளம்,
  மொழிபெயர்ப்பு_நெடுவரிசை_அடையாளம்,
  கிளிமூக்கு_மூல்_கூட்ட_அடையாளம்,
  மொழிபெயர்ப்பு_அட்டவணை_சாபி,
  கிளிமூக்கு_தரவுத்தளம்_வார்ப்புரு,
} from "./மாறிலிகள்.js";

import {
  மொழிபெயர்ப்புகளை_ஒன்றாக்கு,
  மொழிபெயர்ப்பு_பட்டியலிலிருந்து_அகராதி,
  மொழிபெயர்ப்பு_உறுப்படியிலிருந்து_மொழிபெயர்ப்பு_முடிவு,
  பரிந்துரை_உறுப்படியிலிருந்து_பரிந்துரை_முடிவு,
  எதுமே_செய்யாதே,
  பரிந்துரை_முடிவிலிருந்து_பரிந்துரை_உறுப்படி,
} from "./கருவிகள்.js";
import {
  மொழிபெயர்ப்பு_பரிந்துரை_உறுப்படி_வகை,
  மொழிபெயர்ப்பு_அகராதி_வகை,
  பிணையம்_மொழிபெயர்ப்பு_பரிந்துரை_வகை,
  முன்னேற்றம்_தகவல்கள்,
  மொழி_மொழிபெயர்ப்பு_அகராதி_வகை,
} from "./வகைகள்.js";

export class கிளிமூக்கு {
  மூல்_மொழிபெயர்ப்புகள்: மொழிபெயர்ப்பு_அகராதி_வகை;
  தனித்துவமிக்க_அடையாளம்: string;
  மூல்_மொழி?: string;
  கிளி?: கிளி<மொழிபெயர்ப்பு_பரிந்துரை_உறுப்படி_வகை>;

  constructor({
    விண்மீன்,
    மூல்_மொழிபெயர்ப்புகள்,
    மூல்_மொழி,
    அடையாளம்,
  }: {
    மூல்_மொழிபெயர்ப்புகள்?: மொழிபெயர்ப்பு_அகராதி_வகை;
    விண்மீன்?: Constellation;
    அடையாளம்?: string;
    மூல்_மொழி?: string;
  }) {
    this.தனித்துவமிக்க_அடையாளம் = uuidv4();
    if (அடையாளம்) {
      if (!விண்மீன்) throw new Error();
      this.கிளி = new கிளி({
        விண்மீன்,
        அட்டவணை_சாபி: மொழிபெயர்ப்பு_அட்டவணை_சாபி,
        குழு_அடையாளம்: அடையாளம்,
        வார்ப்புரு: கிளிமூக்கு_தரவுத்தளம்_வார்ப்புரு,
      });
    }

    this.மூல்_மொழிபெயர்ப்புகள் = மூல்_மொழிபெயர்ப்புகள் || {};
    this.மூல்_மொழி = மூல்_மொழி;
  }

  static async உருவாக்கு({
    விண்மீன்,
    பேற்றோர் = கிளிமூக்கு_மூல்_கூட்ட_அடையாளம்,
  }: {
    விண்மீன்: Constellation;
    பேற்றோர்?: string;
  }): Promise<string> {
    const அடையாளம் = await கிளி.உருவாக்கு({
      விண்மீன்,
      பேற்றோர்,
      வார்ப்புரு: கிளிமூக்கு_தரவுத்தளம்_வார்ப்புரு,
      அட்டவணை_சாபி: மொழிபெயர்ப்பு_அட்டவணை_சாபி,
    });
    return அடையாளம்;
  }

  async சாபிகளை_கேள்ளு({
    செ,
    பரிந்துரைகள் = "வேண்டாம்",
  }: {
    செ: types.schémaFonctionSuivi<string[]>;
    பரிந்துரைகள்?: "எனது" | "எல்லாம்" | "வேண்டாம்";
  }): Promise<types.schémaFonctionOublier> {
    const சாபிகள்: {
      மூல்: string[];
      அங்கீகரிக்கப்பட்டவை: string[];
      பரிந்துரைகள்: string[];
    } = {
      மூல்: Object.keys(this.மூல்_மொழிபெயர்ப்புகள்),
      அங்கீகரிக்கப்பட்டவை: [],
      பரிந்துரைகள்: [],
    };
    const செ_கடைசி = async () => {
      return await செ([...new Set([...Object.values(சாபிகள்).flat()])]);
    };

    const மறந்துவிடு: types.schémaFonctionOublier[] = [];

    const அங்கீகரிக்கப்பட்டவைகளை_மறந்துவிடு =
      await this.அங்கீகரிக்கப்பட்ட_மொழிபெயர்ப்புகளை_கேள்ளு({
        செ: async (இ) => {
          சாபிகள்.அங்கீகரிக்கப்பட்டவை = Object.keys(இ);
          return await செ_கடைசி();
        },
      });
    மறந்துவிடு.push(அங்கீகரிக்கப்பட்டவைகளை_மறந்துவிடு);

    if (பரிந்துரைகள் === "எனது") {
      const பரிந்துரைகளை_மறந்துவிடு =
        await this.என்_மொழிபெயர்ப்பு_பரிந்துரைகளை_கேள்ளு({
          செ: async (ப) => {
            சாபிகள்.பரிந்துரைகள் = ப.map((இ) => இ.பரிந்துரை.சாபி);
            await செ_கடைசி();
          },
        });
      மறந்துவிடு.push(பரிந்துரைகளை_மறந்துவிடு);
    } else if (பரிந்துரைகள் === "எல்லாம்") {
      const பரிந்துரைகளை_மறந்துவிடு = (
        await this.மொழிபெயர்ப்பு_பரிந்துரைகளை_கேள்ளு({
          செ: async (ப) => {
            சாபிகள்.பரிந்துரைகள் = ப.map((இ) => இ.பரிந்துரை.சாபி);
            await செ_கடைசி();
          },
        })
      ).fOublier;
      மறந்துவிடு.push(பரிந்துரைகளை_மறந்துவிடு);
    }

    return async () => {
      await Promise.all(மறந்துவிடு.map((ம) => ம()));
    };
  }

  async மொழிகளை_கேள்ளு({
    பரிந்துரைகள் = "எனது",
    செ,
  }: {
    பரிந்துரைகள்?: "எனது" | "எல்லாம்" | "வேண்டாம்";
    செ: types.schémaFonctionSuivi<string[]>;
  }): Promise<types.schémaFonctionOublier> {
    const மொழிகள்: {
      மூல்: string[];
      அங்கீகரிக்கப்பட்டவை?: string[];
      பரிந்துரைகள்?: string[];
    } = {
      மூல்: Object.values(this.மூல்_மொழிபெயர்ப்புகள்)
        .map((இ) => Object.keys(இ))
        .flat(),
    };
    const செ_கடைசி = async () => {
      await செ([...new Set(Object.values(மொழிகள்).flat())]);
    };
    செ_கடைசி();

    const மறந்துவிடு: types.schémaFonctionOublier[] = [];
    if (this.கிளி) {
      const அங்கீகரிக்கப்பட்டவையை_மறந்துவிடு =
        await this.கிளி.அங்கீகரிக்கப்பட்ட_உறுப்படிகளை_கேள்ளு({
          செ: async (உறுப்படிகள்) => {
            மொழிகள்.அங்கீகரிக்கப்பட்டவை = உறுப்படிகள்.map(
              (உ) => உ.données[இலக்கு_மொழி_நெடுவரிசை_அடையாளம்],
            );
            await செ_கடைசி();
          },
        });
      மறந்துவிடு.push(அங்கீகரிக்கப்பட்டவையை_மறந்துவிடு);

      if (பரிந்துரைகள் === "எனது") {
        மறந்துவிடு.push(
          await this.என்_மொழிபெயர்ப்பு_பரிந்துரைகளை_கேள்ளு({
            செ: async (ப) => {
              மொழிகள்.பரிந்துரைகள் = ப.map(
                (இ) => இ.பரிந்துரை[இலக்கு_மொழி_நெடுவரிசை_அடையாளம்],
              );
              await செ_கடைசி();
            },
          }),
        );
      } else if (பரிந்துரைகள் === "எல்லாம்") {
        மறந்துவிடு.push(
          (
            await this.மொழிபெயர்ப்பு_பரிந்துரைகளை_கேள்ளு({
              செ: async (ப) => {
                மொழிகள்.பரிந்துரைகள் = ப.map(
                  (இ) => இ.பரிந்துரை[இலக்கு_மொழி_நெடுவரிசை_அடையாளம்],
                );
                await செ_கடைசி();
              },
            })
          ).fOublier,
        );
      }
    }

    return async () => {
      await Promise.all(மறந்துவிடு.map((ம) => ம()));
    };
  }

  async அங்கீகரிக்கப்பட்ட_மொழிபெயர்ப்புகளை_கேள்ளு({
    செ,
  }: {
    செ: types.schémaFonctionSuivi<மொழிபெயர்ப்பு_அகராதி_வகை>;
  }): Promise<types.schémaFonctionOublier> {
    const தகவல்கள்: {
      உறுப்படிகள்: tableaux.élémentDonnées<
        அங்கீகரிக்கப்பட்ட_உறுப்படி_வகை<மொழிபெயர்ப்பு_பரிந்துரை_உறுப்படி_வகை>
      >[];
    } = {
      உறுப்படிகள்: [],
    };
    const செ_கடைசி = async () => {
      const அங்கீகரிக்கப்பட்டவை = மொழிபெயர்ப்புகளை_ஒன்றாக்கு(
        மொழிபெயர்ப்பு_பட்டியலிலிருந்து_அகராதி(
          தகவல்கள்.உறுப்படிகள்.map((இ) =>
            மொழிபெயர்ப்பு_உறுப்படியிலிருந்து_மொழிபெயர்ப்பு_முடிவு(இ),
          ),
        ),
        this.மூல்_மொழிபெயர்ப்புகள்,
      );
      await செ(அங்கீகரிக்கப்பட்டவை);
    };
    await செ_கடைசி();

    if (!this.கிளி) return எதுமே_செய்யாதே;
    return await this.கிளி.அங்கீகரிக்கப்பட்ட_உறுப்படிகளை_கேள்ளு({
      செ: async (உறுப்படிகள்) => {
        தகவல்கள்.உறுப்படிகள் = உறுப்படிகள்;
        await செ_கடைசி();
      },
    });
  }

  async மொழிபெயர்ப்புகளை_கேள்ளு({
    செ,
    பரிந்துரைகள் = "எனது",
  }: {
    செ: types.schémaFonctionSuivi<மொழிபெயர்ப்பு_அகராதி_வகை>;
    பரிந்துரைகள்?: "எனது" | "எல்லாம்" | "வேண்டாம்";
  }): Promise<types.schémaFonctionOublier> {
    await செ(this.மூல்_மொழிபெயர்ப்புகள்);
    if (!this.கிளி) return எதுமே_செய்யாதே;

    const தகவல்கள்: {
      அங்கீகரிக்கப்பட்டவை?: அங்கீகரிக்கப்பட்ட_உறுப்படி_வகை<மொழிபெயர்ப்பு_பரிந்துரை_உறுப்படி_வகை>[];
      பரிந்துரைகள்?: பிணையம்_மொழிபெயர்ப்பு_பரிந்துரை_வகை[];
    } = {};
    const நான் = await this.கிளி.விண்மீன்.obtIdCompte();

    const செ_கடைசி = async () => {
      const சாபிகள் = [
        ...new Set([
          ...Object.keys(this.மூல்_மொழிபெயர்ப்புகள்),
          ...(தகவல்கள்.அங்கீகரிக்கப்பட்டவை || []).map((இ) => இ.சாபி),
        ]),
      ];
      const மொழிபெயர்ப்புகள்: மொழிபெயர்ப்பு_அகராதி_வகை = {};

      for (const சாபி of சாபிகள்) {
        const சாபிக்கு_அங்கீகரிக்கப்பட்டவை =
          தகவல்கள்.அங்கீகரிக்கப்பட்டவை?.filter((இ) => இ.சாபி === சாபி) || [];
        const சாபிக்கு_பரிந்துரைகள் =
          தகவல்கள்.பரிந்துரைகள்?.filter((ப) => ப.பரிந்துரை.சாபி === சாபி) || [];
        const சாபிக்கு_மொழிகள் = [
          ...new Set([
            ...சாபிக்கு_பரிந்துரைகள்.map((ப) => ப.பரிந்துரை.இலக்கு_மொழி),
            ...சாபிக்கு_அங்கீகரிக்கப்பட்டவை.map((இ) => இ.இலக்கு_மொழி),
          ]),
        ];

        const பிணையம்_மொழிபெயர்ப்புகள்: மொழி_மொழிபெயர்ப்பு_அகராதி_வகை = {};
        for (const மொழி of சாபிக்கு_மொழிகள்) {
          const மொழிக்கு_பரிந்துரை = சாபிக்கு_பரிந்துரைகள்
            .filter((ப) => ப.பரிந்துரை.இலக்கு_மொழி === மொழி)
            .sort((இ, ஈ) =>
              (இ.பங்கேற்பாளர் === நான் && ஈ.பங்கேற்பாளர் !== நான்) ||
              இ.பரிந்துரை.தேதி.getTime() > ஈ.பரிந்துரை.தேதி.getTime()
                ? -1
                : 1,
            )[0];

          const மொழிக்கு_அங்கீகரிக்கப்பட்டவை =
            சாபிக்கு_அங்கீகரிக்கப்பட்டவை.find((இ) => இ.இலக்கு_மொழி === மொழி);
          const பிணையம்_மொழிபெயர்ப்பு = மொழிக்கு_பரிந்துரை
            ? மொழிக்கு_அங்கீகரிக்கப்பட்டவை
              ? மொழிக்கு_அங்கீகரிக்கப்பட்டவை.தேதி >
                மொழிக்கு_பரிந்துரை.பரிந்துரை.தேதி.getTime()
                ? மொழிக்கு_அங்கீகரிக்கப்பட்டவை
                : மொழிக்கு_பரிந்துரை.பரிந்துரை
              : மொழிக்கு_பரிந்துரை.பரிந்துரை
            : மொழிக்கு_அங்கீகரிக்கப்பட்டவை;
          if (பிணையம்_மொழிபெயர்ப்பு)
            பிணையம்_மொழிபெயர்ப்புகள்[மொழி] =
              பிணையம்_மொழிபெயர்ப்பு.மொழிபெயர்ப்பு;
        }
        மொழிபெயர்ப்புகள்[சாபி] = Object.assign(
          {},
          this.மூல்_மொழிபெயர்ப்புகள்[சாபி] || {},
          பிணையம்_மொழிபெயர்ப்புகள்,
        );
      }

      return await செ(மொழிபெயர்ப்புகள்);
    };

    const மறந்துவிடு: types.schémaFonctionOublier[] = [];
    if (this.கிளி) {
      const மொழிபெயர்ப்புகளை_மறந்துவிடு =
        await this.கிளி.அங்கீகரிக்கப்பட்ட_உறுப்படிகளை_கேள்ளு({
          செ: async (இ) => {
            தகவல்கள்.அங்கீகரிக்கப்பட்டவை = இ.map((ஈ) => ஈ.données);
            await செ_கடைசி();
          },
        });
      மறந்துவிடு.push(மொழிபெயர்ப்புகளை_மறந்துவிடு);
    }

    if (பரிந்துரைகள் === "எனது") {
      மறந்துவிடு.push(
        await this.என்_மொழிபெயர்ப்பு_பரிந்துரைகளை_கேள்ளு({
          செ: async (ப) => {
            தகவல்கள்.பரிந்துரைகள் = ப;
            await செ_கடைசி();
          },
        }),
      );
    } else if (பரிந்துரைகள் === "எல்லாம்") {
      மறந்துவிடு.push(
        (
          await this.மொழிபெயர்ப்பு_பரிந்துரைகளை_கேள்ளு({
            செ: async (ப) => {
              தகவல்கள்.பரிந்துரைகள் = ப;
              await செ_கடைசி();
            },
          })
        ).fOublier,
      );
    }
    return async () => {
      await Promise.all(மறந்துவிடு.map((ம) => ம()));
    };
  }

  async மொழிபெயர்ப்பு_பரிந்துரைகளை_கேள்ளு({
    சாபி,
    மொழி,
    செ,
  }: {
    சாபி?: string;
    மொழி?: string;
    செ: types.schémaFonctionSuivi<பிணையம்_மொழிபெயர்ப்பு_பரிந்துரை_வகை[]>;
  }): Promise<types.schémaRetourFonctionRechercheParProfondeur> {
    if (!this.கிளி)
      return { fOublier: எதுமே_செய்யாதே, fChangerProfondeur: எதுமே_செய்யாதே };

    return await this.கிளி.பரிந்துரைகளை_கேள்ளு({
      செ: async (பரிந்துரைகள்) => {
        return await செ(
          பரிந்துரைகள்
            .filter(
              (ப) =>
                (!சாபி || ப.பரிந்துரை[சாபி_நெடுவரிசை_அடையாளம்] === சாபி) &&
                (!மொழி || ப.பரிந்துரை[இலக்கு_மொழி_நெடுவரிசை_அடையாளம்] === மொழி),
            )
            .map(பரிந்துரை_உறுப்படியிலிருந்து_பரிந்துரை_முடிவு),
        );
      },
    });
  }

  async என்_மொழிபெயர்ப்பு_பரிந்துரைகளை_கேள்ளு({
    செ,
  }: {
    செ: types.schémaFonctionSuivi<பிணையம்_மொழிபெயர்ப்பு_பரிந்துரை_வகை[]>;
  }): Promise<types.schémaFonctionOublier> {
    if (!this.கிளி) return எதுமே_செய்யாதே;

    return await this.கிளி.என்_பரிந்துரைகளை_கேள்ளு({
      செ: (பரிந்துரைகள்) => {
        செ(
          பரிந்துரைகள்.map((ப) =>
            பரிந்துரை_உறுப்படியிலிருந்து_பரிந்துரை_முடிவு(ப),
          ),
        );
      },
    });
  }

  async முன்னேற்றத்தை_கேள்ளு({
    மொழி,
    வகை,
    செ,
  }: {
    மொழி: string;
    வகை: "சாபி" | "வார்த்தை";
    செ: types.schémaFonctionSuivi<முன்னேற்றம்_தகவல்கள்>;
  }): Promise<types.schémaFonctionOublier> {
    const தகவல்கள்: {
      சாபிகள்?: string[];
      மொழிபெயர்ப்புகள்?: மொழிபெயர்ப்பு_அகராதி_வகை;
      பரிந்துரைக்கப்பட்டவை?: பிணையம்_மொழிபெயர்ப்பு_பரிந்துரை_வகை[];
    } = {};

    const தனித்துவமானது = (
      பரிந்துரைகள்: பிணையம்_மொழிபெயர்ப்பு_பரிந்துரை_வகை[],
    ): பிணையம்_மொழிபெயர்ப்பு_பரிந்துரை_வகை[] => {
      const பார்த்தது: பிணையம்_மொழிபெயர்ப்பு_பரிந்துரை_வகை[] = [];
      for (const பரிந்துரை of பரிந்துரைகள்) {
        if (
          !பார்த்தது.find(
            (ப) =>
              ப.பரிந்துரை.சாபி === பரிந்துரை.பரிந்துரை.சாபி &&
              ப.பரிந்துரை.இலக்கு_மொழி === பரிந்துரை.பரிந்துரை.இலக்கு_மொழி,
          )
        ) {
          பார்த்தது.push(பரிந்துரை);
        }
      }
      return பார்த்தது;
    };

    const செ_கடைசி = async () => {
      if (!தகவல்கள்.சாபிகள்) return;

      if (வகை === "சாபி") {
        const மொத்தம் = தகவல்கள்.சாபிகள்.length;
        const அங்கீகரிக்கப்பட்டவை = தகவல்கள்.சாபிகள்.filter(
          (சாபி) => தகவல்கள்.மொழிபெயர்ப்புகள்?.[சாபி]?.[மொழி],
        );
        const பரிந்துரைக்கப்பட்டவை =
          தகவல்கள்.பரிந்துரைக்கப்பட்டவை?.filter(
            (ப) =>
              ப.பரிந்துரை.இலக்கு_மொழி === மொழி &&
              தகவல்கள்.சாபிகள்?.includes(ப.பரிந்துரை.சாபி) &&
              !அங்கீகரிக்கப்பட்டவை.includes(ப.பரிந்துரை.சாபி),
          ) || [];
        return await செ({
          மொத்தம்,
          அங்கீகரிக்கப்பட்டவை: அங்கீகரிக்கப்பட்டவை.length,
          பரிந்துரைக்கப்பட்டவை: தனித்துவமானது(பரிந்துரைக்கப்பட்டவை).length,
        });
      } else {
        if (!தகவல்கள்.மொழிபெயர்ப்புகள் || !தகவல்கள்.சாபிகள்) return;

        const அளவு = Object.fromEntries(
          தகவல்கள்.சாபிகள்.map((சாபி) => [
            சாபி,
            (this.மூல்_மொழி &&
              தகவல்கள்.மொழிபெயர்ப்புகள்?.[சாபி]?.[this.மூல்_மொழி]?.length) ||
              (தகவல்கள்.மொழிபெயர்ப்புகள்?.[சாபி]
                ? Object.values(தகவல்கள்.மொழிபெயர்ப்புகள்?.[சாபி])[0]?.length
                : 0),
          ]),
        );
        const மொத்தம் = Object.values(அளவு).reduce((இ, ஈ) => இ + ஈ, 0);
        const அங்கீகரிக்கப்பட்ட_சாபிகள் = தகவல்கள்.சாபிகள்.filter(
          (சாபி) => தகவல்கள்.மொழிபெயர்ப்புகள்?.[சாபி]?.[மொழி],
        );
        const அங்கீகரிக்கப்பட்டவை = Object.entries(தகவல்கள்.மொழிபெயர்ப்புகள்)
          .filter((இ) => இ[1][மொழி])
          .map(([சாபி, _]) => அளவு[சாபி])
          .reduce((இ, ஈ) => இ + ஈ, 0);
        const பரிந்துரைக்கப்பட்டவை =
          தகவல்கள்.பரிந்துரைக்கப்பட்டவை
            ?.filter(
              (ப) =>
                ப.பரிந்துரை.இலக்கு_மொழி === மொழி &&
                தகவல்கள்.சாபிகள்?.includes(ப.பரிந்துரை.சாபி) &&
                !அங்கீகரிக்கப்பட்ட_சாபிகள்.includes(ப.பரிந்துரை.சாபி),
            )
            .map((ப) => அளவு[ப.பரிந்துரை.சாபி] || 0)
            .reduce((இ, ஈ) => இ + ஈ, 0) || 0;
        return await செ({
          மொத்தம்,
          அங்கீகரிக்கப்பட்டவை,
          பரிந்துரைக்கப்பட்டவை,
        });
      }
    };

    const செ_மறந்துவிடு: types.schémaFonctionOublier[] = await Promise.all([
      this.சாபிகளை_கேள்ளு({
        செ: async (சாபிகள்) => {
          தகவல்கள்.சாபிகள் = சாபிகள்;
          await செ_கடைசி();
        },
      }),
      this.மொழிபெயர்ப்புகளை_கேள்ளு({
        பரிந்துரைகள்: "வேண்டாம்",
        செ: async (மொழிபெயர்ப்புகள்) => {
          தகவல்கள்.மொழிபெயர்ப்புகள் = மொழிபெயர்ப்புகள்;
          await செ_கடைசி();
        },
      }),
    ]);
    const பரிந்துரைகளை_மறந்துவிடு = (
      await this.மொழிபெயர்ப்பு_பரிந்துரைகளை_கேள்ளு({
        மொழி,
        செ: async (பரிந்துரைகள்) => {
          தகவல்கள்.பரிந்துரைக்கப்பட்டவை = பரிந்துரைகள்;
          await செ_கடைசி();
        },
      })
    ).fOublier;

    const மறந்துவிடு = async () => {
      await Promise.all(செ_மறந்துவிடு.map((செ) => செ()));
      await பரிந்துரைகளை_மறந்துவிடு();
    };
    return மறந்துவிடு;
  }

  async மொழிபெயர்ப்பை_பரிந்துரையு({
    சாபி,
    மொழிபெயர்ப்பு,
    இலக்கு_மொழி,
    மூல்_மொழி,
    மூல்_உரை,
  }: {
    சாபி: string;
    மொழிபெயர்ப்பு: string;
    இலக்கு_மொழி: string;
    மூல்_மொழி?: string;
    மூல்_உரை?: string;
  }): Promise<void> {
    if (!this.கிளி) throw new Error();

    const பரிந்துரை: மொழிபெயர்ப்பு_பரிந்துரை_உறுப்படி_வகை = {
      [சாபி_நெடுவரிசை_அடையாளம்]: சாபி,
      [மொழிபெயர்ப்பு_நெடுவரிசை_அடையாளம்]: மொழிபெயர்ப்பு,
      [இலக்கு_மொழி_நெடுவரிசை_அடையாளம்]: இலக்கு_மொழி,
    };
    if (மூல்_மொழி) {
      பரிந்துரை[மூல்_மொழி_நெடுவரிசை_அடையாளம்] = மூல்_மொழி;
    }
    if (மூல்_உரை) {
      பரிந்துரை[மூல்_உரை_நெடுவரிசை_அடையாளம்] = மூல்_உரை;
    }
    await this.கிளி.பரிந்துரையு({
      பரிந்துரை,
    });
  }

  async மொழிபெயர்ப்பு_பரிந்துரையை_நீக்கு({
    அடையாளம்,
  }: {
    அடையாளம்: string;
  }): Promise<void> {
    if (!this.கிளி) throw new Error();

    await this.கிளி.பரிந்துரையை_நீக்கு({
      அடையாளம்,
    });
  }

  async அங்கீகரி({
    பரிந்துரை,
  }: {
    பரிந்துரை: பிணையம்_மொழிபெயர்ப்பு_பரிந்துரை_வகை;
  }): Promise<string> {
    if (!this.கிளி) throw new Error();
    return await this.கிளி.அங்கீகரி({
      பரிந்துரை: பரிந்துரை_முடிவிலிருந்து_பரிந்துரை_உறுப்படி(பரிந்துரை),
    });
  }

  async அங்கீகரிக்கப்பட்ட_மொழிபெயர்ப்பை_நீக்கு({
    சாபி,
    இலக்கு_மொழி,
    பொறுமை = 1000,
  }: {
    சாபி: string;
    இலக்கு_மொழி: string;
    பொறுமை?: number;
  }): Promise<void> {
    if (!this.கிளி) throw new Error();
    const கிளி_ = this.கிளி;

    const பொறுத்தமானது = (
      அங்கீகறிக்கப்பட்டது: அங்கீகரிக்கப்பட்ட_உறுப்படி_வகை<மொழிபெயர்ப்பு_பரிந்துரை_உறுப்படி_வகை>,
    ): boolean => {
      return (
        அங்கீகறிக்கப்பட்டது.சாபி === சாபி &&
        அங்கீகறிக்கப்பட்டது.இலக்கு_மொழி === இலக்கு_மொழி
      );
    };
    const இருக்கும்_அங்கீகறிக்கப்பட்டது = await ஒருமுறை(
      async (
        fSuivi: (
          இ: Parameters<
            Parameters<
              typeof கிளி_.அங்கீகரிக்கப்பட்ட_உறுப்படிகளை_கேள்ளு
            >[0]["செ"]
          >[0],
        ) => void,
      ) => {
        return await கிளி_.அங்கீகரிக்கப்பட்ட_உறுப்படிகளை_கேள்ளு({
          செ: async (இ) => await fSuivi(இ),
        });
      },
      async (இ) => {
        return (
          !!இ?.find((ஈ) => பொறுத்தமானது(ஈ.données)) ||
          (await attendreStabilité(பொறுமை)(இ))
        );
      },
    );
    const அடையாளம் = இருக்கும்_அங்கீகறிக்கப்பட்டது?.find((இ) =>
      பொறுத்தமானது(இ.données),
    )?.id;
    if (!அடையாளம்) throw new Error();
    return await this.கிளி.அங்கீகரிக்கப்பட்ட_உறுப்படியை_நீக்கு({ அடையாளம் });
  }

  async பேசு({
    சாபி,
    மொழி,
    செ,
    பரிந்துரைகள் = "எனது",
  }: {
    சாபி: string;
    மொழி: string;
    செ: types.schémaFonctionSuivi<string | undefined>;
    பரிந்துரைகள்?: "எனது" | "எல்லாம்" | "வேண்டாம்";
  }): Promise<types.schémaFonctionOublier> {
    const தகவல்கள்: {
      மொழிபெயர்ப்புகள்?: மொழிபெயர்ப்பு_அகராதி_வகை;
    } = {};

    const செ_கடைசி = async () => {
      const மொழிபெயர்ப்பு = தகவல்கள்.மொழிபெயர்ப்புகள்?.[சாபி]?.[மொழி];
      return await செ(மொழிபெயர்ப்பு);
    };

    return await this.மொழிபெயர்ப்புகளை_கேள்ளு({
      பரிந்துரைகள்,
      செ: async (மொழிபெயர்ப்புகள்) => {
        தகவல்கள்.மொழிபெயர்ப்புகள் = மொழிபெயர்ப்புகள்;
        await செ_கடைசி();
      },
    });
  }
}
