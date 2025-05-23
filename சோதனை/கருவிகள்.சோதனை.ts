import {
  பரிந்துரை_உறுப்படியிலிருந்து_பரிந்துரை_முடிவு,
  மரத்திலிருந்து_மொழிபெயர்ப்பு_அகராதி,
  மொழிபெயர்ப்பு_அகராதியிலிருந்து_மரம்,
  மொழிபெயர்ப்பு_உறுப்படியிலிருந்து_மொழிபெயர்ப்பு_முடிவு,
  மொழிபெயர்ப்பு_பட்டியலிலிருந்து_அகராதி,
  மொழிபெயர்ப்புகளை_ஒன்றாக்கு,
  சாபி_நெடுவரிசை_அடையாளம்,
  மொழிபெயர்ப்பு_நெடுவரிசை_அடையாளம்,
  மூல்_உரை_நெடுவரிசை_அடையாளம்,
  மூல்_மொழி_நெடுவரிசை_அடையாளம்,
  இலக்கு_மொழி_நெடுவரிசை_அடையாளம்,
  பரிந்துரை_முடிவிலிருந்து_பரிந்துரை_உறுப்படி,
} from "@/குறியீட்டு.js";
import type { மொழிபெயர்ப்பு_அகராதி_வகை } from "மூலம்/வகைகள்";
import {
  தேதி_நெடுவரிசை_அடையாளம்,
  பங்கேற்பாளர்_நெடுவரிசை_அடையாளம்,
} from "@lassi-js/kili";
import { expect } from "aegir/chai";

describe("மொழிபெயர்ப்பு உறுப்படியிலிருந்து மொழிபெயர்ப்பு முடிவு", async () => {
  it("மாற்றம்", async () => {
    const தேதி = Date.now();
    const முடிவு = மொழிபெயர்ப்பு_உறுப்படியிலிருந்து_மொழிபெயர்ப்பு_முடிவு({
      données: {
        [சாபி_நெடுவரிசை_அடையாளம்]: "சாபி",
        [தேதி_நெடுவரிசை_அடையாளம்]: தேதி,
        [பங்கேற்பாளர்_நெடுவரிசை_அடையாளம்]: "நான்",
        [மொழிபெயர்ப்பு_நெடுவரிசை_அடையாளம்]: "કિલીમૂક્કુ",
        [மூல்_உரை_நெடுவரிசை_அடையாளம்]: "கிளிமூக்கு",
        [மூல்_மொழி_நெடுவரிசை_அடையாளம்]: "த",
        [இலக்கு_மொழி_நெடுவரிசை_அடையாளம்]: "ગુ",
      },
      id: "அடையாளம்",
    });
    expect(முடிவு).to.deep.eq({
      இலக்கு_மொழி: "ગુ",
      கைரேகை: "அடையாளம்",
      சாபி: "சாபி",
      தேதி: new Date(தேதி),
      பங்கேற்பாளர்: "நான்",
      மூல்_உரை: "கிளிமூக்கு",
      மூல்_மொழி: "த",
      மொழிபெயர்ப்பு: "કિલીમૂક્કુ",
    });
  });
});

describe("பரிந்துரை உறுப்படியிலிருந்து பரிந்துரை முடிவு", async () => {
  it("மாற்றம்", async () => {
    const தேதி = Date.now();
    const முடிவு = பரிந்துரை_உறுப்படியிலிருந்து_பரிந்துரை_முடிவு({
      பங்கேற்பாளர்: "நான்",
      அடையாளம்: "அடையாளம்",
      பரிந்துரை: {
        [சாபி_நெடுவரிசை_அடையாளம்]: "சாபி",
        [தேதி_நெடுவரிசை_அடையாளம்]: தேதி,
        [மொழிபெயர்ப்பு_நெடுவரிசை_அடையாளம்]: "விண்மீன்",
        [மூல்_உரை_நெடுவரிசை_அடையாளம்]: "तारामंडल",
        [மூல்_மொழி_நெடுவரிசை_அடையாளம்]: "हिं",
        [இலக்கு_மொழி_நெடுவரிசை_அடையாளம்]: "த",
      },
    });
    expect(முடிவு).to.deep.eq({
      பங்கேற்பாளர்: "நான்",
      அடையாளம்: "அடையாளம்",
      பரிந்துரை: {
        சாபி: "சாபி",
        தேதி: new Date(தேதி),
        மொழிபெயர்ப்பு: "விண்மீன்",
        மூல்_உரை: "तारामंडल",
        மூல்_மொழி: "हिं",
        இலக்கு_மொழி: "த",
      },
    });
  });
});

describe("பரிந்துரை முடிவிலிருந்து பரிந்துரை உறுப்படி", async () => {
  it("மாற்றம்", async () => {
    const தேதி = new Date();
    const முடிவு = பரிந்துரை_முடிவிலிருந்து_பரிந்துரை_உறுப்படி({
      பங்கேற்பாளர்: "நான்",
      அடையாளம்: "அடையாளம்",
      பரிந்துரை: {
        சாபி: "சாபி",
        தேதி,
        மொழிபெயர்ப்பு: "விண்மீன்",
        மூல்_உரை: "तारामंडल",
        மூல்_மொழி: "हिं",
        இலக்கு_மொழி: "த",
      },
    });
    expect(முடிவு).to.deep.eq({
      பங்கேற்பாளர்: "நான்",
      அடையாளம்: "அடையாளம்",
      பரிந்துரை: {
        [சாபி_நெடுவரிசை_அடையாளம்]: "சாபி",
        [தேதி_நெடுவரிசை_அடையாளம்]: தேதி.getTime(),
        [மொழிபெயர்ப்பு_நெடுவரிசை_அடையாளம்]: "விண்மீன்",
        [மூல்_உரை_நெடுவரிசை_அடையாளம்]: "तारामंडल",
        [மூல்_மொழி_நெடுவரிசை_அடையாளம்]: "हिं",
        [இலக்கு_மொழி_நெடுவரிசை_அடையாளம்]: "த",
      },
    });
  });
});

describe("மொழிபெயர்ப்பு பட்டியலிலிருந்து அகராதி", async () => {
  it("மாற்றம்", async () => {
    const அகராதி = மொழிபெயர்ப்பு_பட்டியலிலிருந்து_அகராதி([
      {
        சாபி: "சாபி.முதல்",
        மொழிபெயர்ப்பு: "விண்மீன்",
        இலக்கு_மொழி: "த",
        தேதி: new Date(),
      },
      {
        சாபி: "சாபி.முதல்",
        மொழிபெயர்ப்பு: "तारामंडल",
        இலக்கு_மொழி: "हिं",
        தேதி: new Date(),
      },
      {
        சாபி: "சாபி.இரண்டாவது",
        மொழிபெயர்ப்பு: "கிளிமூக்கு",
        இலக்கு_மொழி: "த",
        தேதி: new Date(),
      },
    ]);
    expect(அகராதி).to.deep.eq({
      "சாபி.முதல்": {
        த: "விண்மீன்",
        हिं: "तारामंडल",
      },
      "சாபி.இரண்டாவது": {
        த: "கிளிமூக்கு",
      },
    });
  });
});

describe("மொழிபெயர்ப்புகளை_ஒன்றாக்கு", async () => {
  let அகராதி: மொழிபெயர்ப்பு_அகராதி_வகை;
  before(async () => {
    const அகராதி_௧: மொழிபெயர்ப்பு_அகராதி_வகை = {
      "சாபி.முதல்": {
        हिं: "तारामंडल",
      },
      "சாபி.இரண்டாவது": {
        த: "கிளிமுக்கு",
      },
    };
    const அகராதி_௨: மொழிபெயர்ப்பு_அகராதி_வகை = {
      "சாபி.முதல்": {
        த: "விண்மீன்",
      },
      "சாபி.இரண்டாவது": {
        த: "கிளிமூக்கு",
      },
    };
    அகராதி = மொழிபெயர்ப்புகளை_ஒன்றாக்கு(அகராதி_௧, அகராதி_௨);
  });
  it("ஒன்றாக்கப்பட்டது", async () => {
    expect(அகராதி).to.deep.eq({
      "சாபி.முதல்": {
        த: "விண்மீன்",
        हिं: "तारामंडल",
      },
      "சாபி.இரண்டாவது": {
        த: "கிளிமூக்கு",
      },
    });
  });
  it("இரண்டாவதுக்கு முன்னுரிமை", async () => {
    expect(அகராதி["சாபி.இரண்டாவது"]["த"]).to.eq("கிளிமூக்கு");
  });
});

describe("மொழிபெயர்ப்பு_அகராதியிலிருந்து_மரம்", async () => {
  it("மாற்றம்", async () => {
    const முடிவு = மொழிபெயர்ப்பு_அகராதியிலிருந்து_மரம்({
      "சாபி.முதல்": {
        த: "விண்மீன்",
        हिं: "तारामंडल",
      },
      "சாபி.இரண்டாவது": {
        த: "கிளிமூக்கு",
      },
    });
    expect(முடிவு).to.deep.eq({
      த: {
        சாபி: {
          முதல்: "விண்மீன்",
          இரண்டாவது: "கிளிமூக்கு",
        },
      },
      हिं: {
        சாபி: {
          முதல்: "तारामंडल",
        },
      },
    });
  });
});

describe("மரத்திலிருந்து_மொழிபெயர்ப்பு_அகராதி", async () => {
  it("மாற்றம்", async () => {
    const முடிவு = மரத்திலிருந்து_மொழிபெயர்ப்பு_அகராதி({
      த: {
        சாபி: {
          முதல்: "விண்மீன்",
          இரண்டாவது: "கிளிமூக்கு",
        },
      },
      हिं: {
        சாபி: {
          முதல்: "तारामंडल",
        },
      },
    });
    expect(முடிவு).to.deep.eq({
      "சாபி.முதல்": {
        த: "விண்மீன்",
        हिं: "तारामंडल",
      },
      "சாபி.இரண்டாவது": {
        த: "கிளிமூக்கு",
      },
    });
  });
});
