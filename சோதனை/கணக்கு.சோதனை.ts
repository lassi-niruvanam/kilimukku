import { type Constellation, créerConstellation } from "@constl/ipa";

import { expect } from "aegir/chai";

import { isBrowser } from "wherearewe";

import { constellation, attente } from "@constl/utils-tests";
import { கணக்கு } from "@/கணக்கு.js";

const { créerConstellationsTest } = constellation;

describe("கணக்கு", async () => {
  let விண்மீன்: Constellation;
  let வேறு_விண்மீன்: Constellation;
  let என்_கணக்கு: கணக்கு;
  let மற்றவரின்_கணக்கு: கணக்கு;
  let அடையாளம்: string;
  let விண்மீன்களை_மறந்துவிடு: () => Promise<void>;

  const என்_திட்டங்கள் = new attente.AttendreRésultat<string[]>();
  const நான்_பங்களிக்கும்_திட்டங்கள் = new attente.AttendreRésultat<string[]>();

  const மறந்துவிடு: (() => Promise<void>)[] = [];

  before(async () => {
    const { clients: வாடிக்கையாளர்கள், fOublier } =
      await créerConstellationsTest({
        n: isBrowser ? 1 : 2,
        créerConstellation,
      });
    விண்மீன்களை_மறந்துவிடு = fOublier;
    விண்மீன் = வாடிக்கையாளர்கள்[0];
    வேறு_விண்மீன் = வாடிக்கையாளர்கள்[isBrowser ? 0 : 1];

    என்_கணக்கு = new கணக்கு({ விண்மீன் });
    மற்றவரின்_கணக்கு = new கணக்கு({ விண்மீன்: வேறு_விண்மீன் });
    const { fOublier: என்_திட்டங்களை_மறந்துவிடு } =
      await என்_கணக்கு.என்_திட்டங்களைக்_கேள்ளு({
        செ: (இ) => என்_திட்டங்கள்.mettreÀJour(இ),
      });
    const நான்_பங்களிக்கும்_திட்டங்களை_மறந்துவிடு =
      await என்_கணக்கு.நான்_பங்களிக்கும்_திட்டங்களை_கேள்ளு({
        செ: (இ) => நான்_பங்களிக்கும்_திட்டங்கள்.mettreÀJour(இ),
      });
    மறந்துவிடு.push(
      என்_திட்டங்களை_மறந்துவிடு,
      நான்_பங்களிக்கும்_திட்டங்களை_மறந்துவிடு,
    );
  });

  after(async () => {
    await Promise.all(மறந்துவிடு.map((செ) => செ()));
    await விண்மீன்களை_மறந்துவிடு();
  });

  it("புது திட்டம்", async () => {
    அடையாளம் = await என்_கணக்கு.திட்டத்தை_உருவாக்கு();
    expect(அடையாளம்).to.be.a("string");

    const மதிப்பு = await என்_திட்டங்கள்.attendreExiste();
    expect(மதிப்பு).to.have.deep.members([அடையாளம்]);
  });

  it("திட்டத்தைத் திற", async () => {
    const திட்டம் = என்_கணக்கு.திட்டத்தைத்_திற({ அடையாளம் });
    await திட்டம்.மொழிபெயர்ப்பை_பரிந்துரையு({
      சாபி: "எதோ ஒன்று",
      மொழிபெயர்ப்பு: "இதோ",
      இலக்கு_மொழி: "த",
    });
    const மதிப்பு = await நான்_பங்களிக்கும்_திட்டங்கள்.attendreQue(
      (இ) => இ.length > 0,
    );
    expect(மதிப்பு).to.have.deep.members([அடையாளம்]);
  });

  it("திட்டத்தைத் நீக்கு", async () => {
    await என்_கணக்கு.திட்டத்தை_நீக்கு({ அடையாளம் });
    const மதிப்பு = await என்_திட்டங்கள்.attendreQue(
      (இ) => !இ.includes(அடையாளம்),
    );
    expect(மதிப்பு).to.be.empty();
  });

  it("மற்றவரின் திட்டம்", async () => {
    const அடையாளம் = await மற்றவரின்_கணக்கு.திட்டத்தை_உருவாக்கு();
    const மற்றவரின்_திட்டம் = என்_கணக்கு.திட்டத்தைத்_திற({ அடையாளம் });
    await மற்றவரின்_திட்டம்.மொழிபெயர்ப்பை_பரிந்துரையு({
      சாபி: "எதோ ஒன்று",
      மொழிபெயர்ப்பு: "இதோ",
      இலக்கு_மொழி: "த",
    });
    const மதிப்பு = await நான்_பங்களிக்கும்_திட்டங்கள்.attendreQue(
      (இ) => இ.length > 1,
    );
    expect(மதிப்பு).to.include(அடையாளம்);
  });
});
