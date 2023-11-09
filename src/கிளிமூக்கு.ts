import type { client, tableaux, types } from "@constl/ipa";
import {
  சாபி_நெடுவரிசை_அடையாளம்,
  இலக்கு_மொழி_நெடுவரிசை_அடையாளம்,
  மூல்_மொழி_நெடுவரிசை_அடையாளம்,
  மூல்_உரை_நெடுவரிசை_அடையாளம்,
  மொழிபெயர்ப்பு_நெடுவரிசை_அடையாளம்,
  // விண்மீன்_மூல்_குழு_அடையாளம்,
  மொழிபெயர்ப்பு_அட்டவணை_சாபி,
  கிளிமூக்கு_தரவுத்தளம்_வார்ப்புரு,
} from "./மாறிலிகள்.js";
import { கிளி } from "@lassi-js/kili";
import type { அங்கீகரிக்கப்பட்ட_உறுப்படி_வகை } from "@lassi-js/kili";
import type { ClientConstellation } from "@constl/ipa";
import {
  மொழிபெயர்ப்புகளை_ஒன்றாக்கு,
  மொழிபெயர்ப்பு_பட்டியலிலிருந்து_அகராதி,
  மொழிபெயர்ப்பு_உறுப்படியிலிருந்து_மொழிபெயர்ப்பு_முடிவு,
  பரிந்துரை_உறுப்படியிலிருந்து_பரிந்துரை_முடிவு,
} from "./கருவிகள்.js";
import {
  மொழிபெயர்ப்பு_பரிந்துரை_உறுப்படி_வகை,
  மொழிபெயர்ப்பு_அகராதி_வகை,
  பிணையம்_மொழிபெயர்ப்பு_பரிந்துரை_வகை,
  முன்னேற்றம்_தகவல்கள்,
} from "./வகைகள்.js";

export class கிளிமூக்கு extends கிளி<மொழிபெயர்ப்பு_பரிந்துரை_உறுப்படி_வகை> {
  மூல்_மொழிபெயர்ப்புகள்: மொழிபெயர்ப்பு_அகராதி_வகை;
  மூல்_மொழி?: string;

  constructor({
    விண்மீன்,
    மூல்_மொழிபெயர்ப்புகள்,
    மூல்_மொழி,
    அடையாளம்,
  }: {
    விண்மீன்: ClientConstellation;
    மூல்_மொழிபெயர்ப்புகள்: மொழிபெயர்ப்பு_அகராதி_வகை;
    அடையாளம்: string;
    மூல்_மொழி?: string;
  }) {
    super({
      விண்மீன்,
      அட்டவணை_சாபி: மொழிபெயர்ப்பு_அட்டவணை_சாபி,
      குழு_அடையாளம்: அடையாளம்,
      வார்ப்புரு: கிளிமூக்கு_தரவுத்தளம்_வார்ப்புரு,
    });

    this.மூல்_மொழிபெயர்ப்புகள் = மூல்_மொழிபெயர்ப்புகள்;
    this.மூல்_மொழி = மூல்_மொழி;
  }

  static async உருவாக்கு({
    விண்மீன், // பேற்றோர் = விண்மீன்_மூல்_குழு_அடையாளம்,
  }: {
    விண்மீன்: client.default;
    // பேற்றோர்?: string;
  }): Promise<string> {
    const அடையாளம் = await கிளி.உருவாக்கு({
      விண்மீன்,
      // பேற்றோர்,
      வார்ப்புரு: கிளிமூக்கு_தரவுத்தளம்_வார்ப்புரு,
      அட்டவணை_சாபி: மொழிபெயர்ப்பு_அட்டவணை_சாபி,
    });
    return அடையாளம்;
  }

  async சாபிகளை_கேள்ளு({
    செ,
  }: {
    செ: types.schémaFonctionSuivi<string[]>;
  }): Promise<types.schémaFonctionOublier> {
    const சாபிகள்: {
      மூல்: string[];
      மொழிபெயர்ப்புகள்: string[];
    } = {
      மூல்: Object.keys(this.மூல்_மொழிபெயர்ப்புகள்),
      மொழிபெயர்ப்புகள்: [],
    };
    const மொழிபெயர்ப்புகளை_மறந்துவிடு = await this.மொழிபெயர்ப்புகளை_கேள்ளு({
      செ: async (இ) => {
        சாபிகள்.மொழிபெயர்ப்புகள் = Object.keys(இ);
        return await செ([...new Set(Object.values(சாபிகள்).flat())]);
      },
    });

    return மொழிபெயர்ப்புகளை_மறந்துவிடு;
  }

  async மொழிகளை_கேள்ளு({
    பரிந்துரைகளும் = true,
    செ,
  }: {
    பரிந்துரைகளும்?: boolean;
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

    const அங்கீகரிக்கப்பட்டவையை_மறந்துவிடு =
      await this.அங்கீகரிக்கப்பட்ட_உறுப்படிகளை_கேள்ளு({
        செ: async (உறுப்படிகள்) => {
          மொழிகள்.அங்கீகரிக்கப்பட்டவை = உறுப்படிகள்.map(
            (உ) => உ.données[இலக்கு_மொழி_நெடுவரிசை_அடையாளம்],
          );
          await செ_கடைசி();
        },
      });
    const மறந்துவிடு = [அங்கீகரிக்கப்பட்டவையை_மறந்துவிடு];

    if (பரிந்துரைகளும்) {
      மறந்துவிடு.push(
        (
          await this.பரிந்துரைகளை_கேள்ளு({
            செ: async (பரிந்துரைகள்) => {
              மொழிகள்.பரிந்துரைகள் = பரிந்துரைகள்.map(
                (ப) => ப.பரிந்துரை[இலக்கு_மொழி_நெடுவரிசை_அடையாளம்],
              );
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

    return await this.அங்கீகரிக்கப்பட்ட_உறுப்படிகளை_கேள்ளு({
      செ: async (உறுப்படிகள்) => {
        தகவல்கள்.உறுப்படிகள் = உறுப்படிகள்;
        await செ_கடைசி();
      },
    });
  }

  async மொழிபெயர்ப்புகளை_கேள்ளு({
    செ,
    பரிந்துரைகள்,
  }: {
    செ: types.schémaFonctionSuivi<மொழிபெயர்ப்பு_அகராதி_வகை>;
    பரிந்துரைகள்?: "எனது" | "எல்லாம்";
  }): Promise<types.schémaFonctionOublier> {
    await செ(this.மூல்_மொழிபெயர்ப்புகள்);

    const தகவல்கள்: {
      அங்கீகரிக்கப்பட்டவை?: மொழிபெயர்ப்பு_அகராதி_வகை;
      பரிந்துரைகள்?: பிணையம்_மொழிபெயர்ப்பு_பரிந்துரை_வகை[];
    } = {};
    const நான் = await this.விண்மீன்.obtIdCompte();

    const செ_கடைசி = async () => {
      let இறுதியான_பரிந்துரைகள்: பிணையம்_மொழிபெயர்ப்பு_பரிந்துரை_வகை[] = [];
      (தகவல்கள்.பரிந்துரைகள் || []).forEach((ப) => {
        const இருக்கும்_பரிந்துரை = இறுதியான_பரிந்துரைகள்.find(
          (இ) => இ.பரிந்துரை.சாபி === ப.பரிந்துரை.சாபி,
        );
        if (!இருக்கும்_பரிந்துரை) {
          இறுதியான_பரிந்துரைகள்.push(ப);
        } else {
          if (
            (ப.பங்கேற்பாளர் === நான் &&
              இருக்கும்_பரிந்துரை.பங்கேற்பாளர் !== நான்) ||
            (ப.பரிந்துரை.தேதி || 0) > (இருக்கும்_பரிந்துரை.பரிந்துரை.தேதி || 0)
          ) {
            இறுதியான_பரிந்துரைகள் = [
              ப,
              ...இறுதியான_பரிந்துரைகள்.filter(
                (இ) => இ.அடையாளம் !== இருக்கும்_பரிந்துரை.அடையாளம்,
              ),
            ];
          }
        }
      });
      const பரிந்துரைகள் = மொழிபெயர்ப்பு_பட்டியலிலிருந்து_அகராதி(
        இறுதியான_பரிந்துரைகள்.map((ப) => ப.பரிந்துரை),
      );
      const மொழிபெயர்ப்புகள் = மொழிபெயர்ப்புகளை_ஒன்றாக்கு(
        this.மூல்_மொழிபெயர்ப்புகள்,
        தகவல்கள்.அங்கீகரிக்கப்பட்டவை || {},
        பரிந்துரைகள்,
      );
      return await செ(மொழிபெயர்ப்புகள்);
    };

    const மொழிபெயர்ப்புகளை_மறந்துவிடு =
      await this.அங்கீகரிக்கப்பட்ட_உறுப்படிகளை_கேள்ளு({
        செ: async (இ) => {
          const அங்கீகரிக்கப்பட்ட_அகராதி =
            மொழிபெயர்ப்பு_பட்டியலிலிருந்து_அகராதி(
              இ.map(மொழிபெயர்ப்பு_உறுப்படியிலிருந்து_மொழிபெயர்ப்பு_முடிவு),
            );
          const மொழிபெயர்ப்புகள் = மொழிபெயர்ப்புகளை_ஒன்றாக்கு(
            this.மூல்_மொழிபெயர்ப்புகள்,
            அங்கீகரிக்கப்பட்ட_அகராதி,
          );
          தகவல்கள்.அங்கீகரிக்கப்பட்டவை = மொழிபெயர்ப்புகள்;
        },
      });
    const மறந்துவிடு = [மொழிபெயர்ப்புகளை_மறந்துவிடு];

    if (பரிந்துரைகள் === "எனது") {
      மறந்துவிடு.push(
        await this.எனது_மொழிபெயர்ப்பு_பரிந்துரைகளை_கேள்ளு({
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
    return await this.பரிந்துரைகளை_கேள்ளு({
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

  async எனது_மொழிபெயர்ப்பு_பரிந்துரைகளை_கேள்ளு({
    செ,
  }: {
    செ: types.schémaFonctionSuivi<பிணையம்_மொழிபெயர்ப்பு_பரிந்துரை_வகை[]>;
  }): Promise<types.schémaFonctionOublier> {
    return await this.எனது_பரிந்துரைகளை_கேள்ளு({
      செ: (பரிந்துரைகள்) =>
        செ(
          பரிந்துரைகள்.map((ப) =>
            பரிந்துரை_உறுப்படியிலிருந்து_பரிந்துரை_முடிவு(ப),
          ),
        ),
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
              !அங்கீகரிக்கப்பட்டவை.includes(ப.பரிந்துரை.சாபி),
          ) || [];
        return await செ({
          மொத்தம்,
          அங்கீகரிக்கப்பட்டவை: அங்கீகரிக்கப்பட்டவை.length,
          பரிந்துரைக்கப்பட்டவை: பரிந்துரைக்கப்பட்டவை.length,
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
        const அங்கீகரிக்கப்பட்டவை = Object.entries(தகவல்கள்.மொழிபெயர்ப்புகள்)
          .filter((இ) => இ[1][மொழி])
          .map(([சாபி, _]) => அளவு[சாபி])
          .reduce((இ, ஈ) => இ + ஈ, 0);
        const பரிந்துரைக்கப்பட்டவை =
          தகவல்கள்.பரிந்துரைக்கப்பட்டவை
            ?.map((ப) => அளவு[ப.பரிந்துரை.சாபி] || 0)
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
    const பரிந்துரை: மொழிபெயர்ப்பு_பரிந்துரை_உறுப்படி_வகை = {
      [சாபி_நெடுவரிசை_அடையாளம்]: சாபி,
      [மொழிபெயர்ப்பு_நெடுவரிசை_அடையாளம்]: மொழிபெயர்ப்பு,
      [இலக்கு_மொழி_நெடுவரிசை_அடையாளம்]: இலக்கு_மொழி,
      [மூல்_மொழி_நெடுவரிசை_அடையாளம்]: மூல்_மொழி,
      [மூல்_உரை_நெடுவரிசை_அடையாளம்]: மூல்_உரை,
    };
    await this.பரிந்துரையு({
      பரிந்துரை,
    });
  }

  async பேசு({
    சாபி,
    மொழி,
    செ,
    பரிந்துரைகள்,
  }: {
    சாபி: string;
    மொழி: string;
    செ: types.schémaFonctionSuivi<string | undefined>;
    பரிந்துரைகள்: "எனது" | "எல்லாம்";
  }): Promise<types.schémaFonctionOublier> {
    const தகவல்கள்: {
      மொழிபெயர்ப்புகள்?: மொழிபெயர்ப்பு_அகராதி_வகை;
      பரிந்துரைகள்?: பிணையம்_மொழிபெயர்ப்பு_பரிந்துரை_வகை[];
    } = {};

    const செ_கடைசி = async () => {
      const மொழிபெயர்ப்பு = தகவல்கள்.மொழிபெயர்ப்புகள்?.[சாபி]?.[மொழி];
      if (மொழிபெயர்ப்பு) {
        return await செ(மொழிபெயர்ப்பு);
      } else {
        const நான் = await this.விண்மீன்.obtIdCompte();
        const பரிந்துரைகள் = (தகவல்கள்.பரிந்துரைகள் || []).filter(
          (ப) => ப.பரிந்துரை.சாபி === சாபி && ப.பரிந்துரை.இலக்கு_மொழி === மொழி,
        );
        const என்_பரிரிந்துரை = பரிந்துரைகள்.find(
          (ப) => ப.பங்கேற்பாளர் === நான்,
        );

        return await செ(
          (என்_பரிரிந்துரை || பரிந்துரைகள்[0])?.பரிந்துரை?.மொழிபெயர்ப்பு,
        );
      }
    };

    const மொழிபெயர்ப்புகளை_மறந்துவிடு = await this.மொழிபெயர்ப்புகளை_கேள்ளு({
      செ: async (மொழிபெயர்ப்புகள்) => {
        தகவல்கள்.மொழிபெயர்ப்புகள் = மொழிபெயர்ப்புகள்;
        await செ_கடைசி();
      },
    });
    const மறந்துவிடு = [மொழிபெயர்ப்புகளை_மறந்துவிடு];

    if (பரிந்துரைகள் === "எனது") {
      மறந்துவிடு.push(
        await this.எனது_மொழிபெயர்ப்பு_பரிந்துரைகளை_கேள்ளு({
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
}
