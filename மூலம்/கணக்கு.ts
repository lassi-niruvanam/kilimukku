import type { Constellation, types } from "@constl/ipa";

import type { மொழிபெயர்ப்பு_அகராதி_வகை } from "./வகைகள்.js";

import { கிளிமூக்கு } from "./கிளிமூக்கு.js";
import { கிளிமூக்கு_மூல்_கூட்ட_அடையாளம் } from "./மாறிலிகள்.js";
import { suivreBdsDeFonctionListe } from "@constl/utils-ipa";

export class கணக்கு {
  _விண்மீன்?: Constellation;
  மூல்_கூட்டம்_அடையாளம்: string;

  constructor({
    விண்மீன்,
    மூல்_கூட்டம்_அடையாளம் = கிளிமூக்கு_மூல்_கூட்ட_அடையாளம்,
  }: {
    விண்மீன்?: Constellation;
    மூல்_கூட்டம்_அடையாளம்?: string;
  }) {
    this._விண்மீன் = விண்மீன்;
    this.மூல்_கூட்டம்_அடையாளம் = மூல்_கூட்டம்_அடையாளம்;
  }

  get விண்மீன்(): Constellation {
    if (!this._விண்மீன்)
      throw new Error(
        "இந்த செயலியைப் பயன்படுகிறதற்கு கிளிமூக்கு கணக்கை விண்மீனுடன் துவக்கவும்: `new கணக்கு({ விண்மீன் })`",
      );
    return this._விண்மீன்;
  }

  async திட்டத்தை_உருவாக்கு({
    பேற்றோர்,
  }: {
    பேற்றோர்?: string;
  } = {}): Promise<string> {
    return await கிளிமூக்கு.உருவாக்கு({
      விண்மீன்: this.விண்மீன்,
      பேற்றோர்: பேற்றோர் || this.மூல்_கூட்டம்_அடையாளம்,
    });
  }

  திட்டத்தைத்_திற({
    அடையாளம்,
    மூல்_மொழிபெயர்ப்புகள்,
    மூல்_மொழி,
  }: {
    அடையாளம்: string;
    மூல்_மொழிபெயர்ப்புகள்?: மொழிபெயர்ப்பு_அகராதி_வகை;
    மூல்_மொழி?: string;
  }): கிளிமூக்கு {
    return new கிளிமூக்கு({
      விண்மீன்: this.விண்மீன்,
      மூல்_மொழிபெயர்ப்புகள்,
      மூல்_மொழி,
      அடையாளம்,
    });
  }

  async என்_திட்டங்களைக்_கேள்ளு({
    செ,
  }: {
    செ: types.schémaFonctionSuivi<string[]>;
  }): Promise<types.schémaRetourFonctionRechercheParN> {
    return await this.விண்மீன்.nuées.rechercherNuéesDéscendantes({
      idNuée: this.மூல்_கூட்டம்_அடையாளம்,
      f: செ,
      toutLeRéseau: false,
    });
  }

  async நான்_பங்களிக்கும்_திட்டங்களை_கேள்ளு({
    செ,
  }: {
    செ: types.schémaFonctionSuivi<string[]>;
  }): Promise<types.schémaFonctionOublier> {
    return await suivreBdsDeFonctionListe({
      fListe: async (fSuivreRacine: types.schémaFonctionSuivi<string[]>) => {
        return await this.விண்மீன்.bds.suivreBds({
          f: fSuivreRacine,
        });
      },
      fBranche: async (
        idBd: string,
        fSuivreBrancheBds: types.schémaFonctionSuivi<string[]>,
      ) => {
        return await suivreBdsDeFonctionListe({
          fListe: async (
            fSuivreRacine: types.schémaFonctionSuivi<string[]>,
          ) => {
            return await this.விண்மீன்.bds.suivreNuéesBd({
              idBd,
              f: fSuivreRacine,
            });
          },
          fBranche: async (
            idNuée: string,
            fSuivreBranche: types.schémaFonctionSuivi<string | undefined>,
          ) => {
            return await this.விண்மீன்.nuées.suivreNuéesParents({
              idNuée,
              f: async (parents) =>
                await fSuivreBranche(
                  parents.includes(this.மூல்_கூட்டம்_அடையாளம்)
                    ? idNuée
                    : undefined,
                ),
            });
          },
          f: (idsNuées: (string | undefined)[]) =>
            fSuivreBrancheBds(idsNuées.filter((x) => !!x) as string[]),
        });
      },
      f: செ,
    });
  }

  async திட்டத்தை_நீக்கு({ அடையாளம் }: { அடையாளம்: string }) {
    await this.விண்மீன்.nuées.effacerNuée({ idNuée: அடையாளம் });
  }
}
