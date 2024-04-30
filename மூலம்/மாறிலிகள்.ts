import type { bds } from "@constl/ipa";
import { தேதி_மாறி_அடையாளம், தேதி_நெடுவரிசை_அடையாளம் } from "@lassi-js/kili";

export const மொழிபெயர்ப்பு_அட்டவணை_சாபி = "மொழிபெயர்ப்புகள்";

export const சாபி_நெடுவரிசை_அடையாளம் = "சாபி";
export const மூல்_மொழி_நெடுவரிசை_அடையாளம் = "மூல்_மொழி";
export const இலக்கு_மொழி_நெடுவரிசை_அடையாளம் = "இலக்கு_மொழி";
export const மூல்_உரை_நெடுவரிசை_அடையாளம் = "மூல்_உரை";
export const மொழிபெயர்ப்பு_நெடுவரிசை_அடையாளம் = "மொழிபெயர்ப்பு";

export const கிளிமூக்கு_மூல்_கூட்ட_அடையாளம் =
  "/orbitdb/zdpuAyiNBJZCMSTWynQrRynKCbfz7uJhv892B5Dy1qnyQfwP6";

export const சாபி_மாறி_அடையாளம் =
  "/orbitdb/zdpuAviHxRLaTdUCfJeh1Dw8hbiHkcRsmEkiitX2MXQes3XYY";
export const மூல்_மொழி_மாறி_அடையாளம் =
  "/orbitdb/zdpuAyCPoNvoFVRt4y5uA97d8LLjcXnqs2CaoS6oVvbZwkSou";
export const இலக்கு_மொழி_மாறி_அடையாளம் =
  "/orbitdb/zdpuB35kfHohXZQnFFAMhwFPt78vH7e1NuquQ6KcNMPGQ3Hgj";
export const மூல்_உரை_மாறி_அடையாளம் =
  "/orbitdb/zdpuAwxQnCrzYK3kXtM4MGYfdWhM3rjSb1cyQx4hMSwjHzgf9";
export const மொழிபெயர்ப்பு_மாறி_அடையாளம் =
  "/orbitdb/zdpuB3HFW5njgmT9kxvJoxNq7wG27iCj8GLf3F3iKtfecw8De";

export const மொழியாக்கம்_சிறப்பு_சொல்_அடையாளம் =
  "/orbitdb/zdpuAnASCNyc198pcsxDYCdZoAvfj5EC3iWbeMyK9FRsAaoaS";
export const கிளிமூக்கு_சிறப்பு_சொல்_அடையாளம் =
  "/orbitdb/zdpuAzksPz4pdkBfy1Z74LStFLGPS3njxtD6BEvcPEYdSEv8R";


export const கிளிமூக்கு_தரவுத்தளம்_வார்ப்புரு: bds.schémaSpécificationBd = {
  motsClefs: [
    மொழியாக்கம்_சிறப்பு_சொல்_அடையாளம்,
    கிளிமூக்கு_சிறப்பு_சொல்_அடையாளம்,
  ],
  licence: "ODbl-1_0",
  tableaux: [
    {
      clef: மொழிபெயர்ப்பு_அட்டவணை_சாபி,
      cols: [
        {
          idVariable: சாபி_மாறி_அடையாளம்,
          idColonne: சாபி_நெடுவரிசை_அடையாளம்,
          index: true,
        },
        {
          idVariable: மூல்_மொழி_மாறி_அடையாளம்,
          idColonne: மூல்_மொழி_நெடுவரிசை_அடையாளம்,
        },
        {
          idVariable: இலக்கு_மொழி_மாறி_அடையாளம்,
          idColonne: இலக்கு_மொழி_நெடுவரிசை_அடையாளம்,
          index: true,
        },
        {
          idVariable: மூல்_உரை_மாறி_அடையாளம்,
          idColonne: மூல்_உரை_நெடுவரிசை_அடையாளம்,
        },
        {
          idVariable: மொழிபெயர்ப்பு_மாறி_அடையாளம்,
          idColonne: மொழிபெயர்ப்பு_நெடுவரிசை_அடையாளம்,
        },
        {
          idVariable: தேதி_மாறி_அடையாளம்,
          idColonne: தேதி_நெடுவரிசை_அடையாளம்,
        },
      ],
    },
  ],
};
