import { type ClientConstellation, générerClient } from "@constl/ipa";

import { expect } from "aegir/chai";

import { isBrowser } from "wherearewe";

import { client, attente } from "@constl/utils-tests";

const { générerClients } = client;

describe("கணக்கு", async () => {
    let விண்மீன்: ClientConstellation;
    let வேறு_விண்மீன்: ClientConstellation;
  
    const மறந்துவிடு: (() => Promise<void>)[] = [];
  
    before(async () => {
      const { clients: வாடிக்கையாளர்கள், fOublier: விண்மீனை_மறந்துவிடு } =
        await générerClients({ n: isBrowser ? 1 : 2, générerClient });
      மறந்துவிடு.push(விண்மீனை_மறந்துவிடு);
      விண்மீன் = வாடிக்கையாளர்கள்[0];
      வேறு_விண்மீன் = வாடிக்கையாளர்கள்[isBrowser ? 0 : 1];
    });
  
    after(async () => {
      return await Promise.all(மறந்துவிடு.map((செ) => செ()));
    });

    
});