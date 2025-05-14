import type { bds } from "@constl/ipa";
import { தேதி_நெடுவரிசை_அடையாளம் } from "@lassi-js/kili";

export const மொழிபெயர்ப்பு_அட்டவணை_சாபி = "c12bdc50-4ba5-4103-85b6-47083cab1a43";

export const சாபி_நெடுவரிசை_அடையாளம் = "c6da1948-53f6-43ab-aea4-c16c1e0827d5";
export const மூல்_மொழி_நெடுவரிசை_அடையாளம் = "fab36dd3-3b29-4672-ac1e-8908090022b3";
export const இலக்கு_மொழி_நெடுவரிசை_அடையாளம் = "189becec-67b0-4da5-9357-fb3c68b2ee8c";
export const மூல்_உரை_நெடுவரிசை_அடையாளம் = "0f337a12-9177-49c4-a6b2-3e75bc18faed";
export const மொழிபெயர்ப்பு_நெடுவரிசை_அடையாளம் = "5a2f0b24-eca8-49a8-9b03-5475ea3b2e76";

export const கிளிமூக்கு_மூல்_கூட்ட_அடையாளம் =
  "/orbitdb/zdpuAn94dUjyHmjVbXXxi7g7QYWYfHWXk6nkWXAjdMRhbnTgC";

export const கிளிமூக்கு_தரவுத்தளம்_வார்ப்புரு: bds.schémaSpécificationBd = {
  licence: "ODbl-1_0",
  tableaux: [
    {
      clef: மொழிபெயர்ப்பு_அட்டவணை_சாபி,
      cols: [
        {
          idColonne: சாபி_நெடுவரிசை_அடையாளம்,
        },
        {
          idColonne: மூல்_மொழி_நெடுவரிசை_அடையாளம்,
        },
        {
          idColonne: இலக்கு_மொழி_நெடுவரிசை_அடையாளம்,
        },
        {
          idColonne: மூல்_உரை_நெடுவரிசை_அடையாளம்,
        },
        {
          idColonne: மொழிபெயர்ப்பு_நெடுவரிசை_அடையாளம்,
        },
        {
          idColonne: தேதி_நெடுவரிசை_அடையாளம்,
        },
      ],
    },
  ],
};
