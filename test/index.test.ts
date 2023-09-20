import {
  KeyOrigin,
  MultisigWalletConfig,
  decodeDescriptors,
  encodeDescriptors,
} from "../src";

const external =
  "sh(sortedmulti(2,[f57ec65d/45'/0'/100']xpub6CCHViYn5VzPfSR7baop9FtGcbm3UnqHwa54Z2eNvJnRFCJCdo9HtCYoLJKZCoATMLUowDDA1BMGfQGauY3fDYU3HyMzX4NDkoLYCSkLpbH/0/*,[efa5d916/45'/0'/100']xpub6Ca5CwTgRASgkXbXE5TeddTP9mPCbYHreCpmGt9dhz9y6femstHGCoFESHHKKRcm414xMKnuLjP9LDS7TwaJC9n5gxua6XB1rwPcC6hqDub/0/*))#uxj9xxul";
const internal =
  "sh(sortedmulti(2,[f57ec65d/45'/0'/100']xpub6CCHViYn5VzPfSR7baop9FtGcbm3UnqHwa54Z2eNvJnRFCJCdo9HtCYoLJKZCoATMLUowDDA1BMGfQGauY3fDYU3HyMzX4NDkoLYCSkLpbH/1/*,[efa5d916/45'/0'/100']xpub6Ca5CwTgRASgkXbXE5TeddTP9mPCbYHreCpmGt9dhz9y6femstHGCoFESHHKKRcm414xMKnuLjP9LDS7TwaJC9n5gxua6XB1rwPcC6hqDub/1/*))#3hxf9z66";

const expectedKeys = [
  {
    xfp: "f57ec65d",
    bip32Path: "m/45'/0'/100'",
    xpub: "xpub6CCHViYn5VzPfSR7baop9FtGcbm3UnqHwa54Z2eNvJnRFCJCdo9HtCYoLJKZCoATMLUowDDA1BMGfQGauY3fDYU3HyMzX4NDkoLYCSkLpbH",
  },
  {
    xfp: "efa5d916",
    bip32Path: "m/45'/0'/100'",
    xpub: "xpub6Ca5CwTgRASgkXbXE5TeddTP9mPCbYHreCpmGt9dhz9y6femstHGCoFESHHKKRcm414xMKnuLjP9LDS7TwaJC9n5gxua6XB1rwPcC6hqDub",
  },
];

describe("decodeDescriptors", () => {
  it("works", async () => {
    const config = await decodeDescriptors(internal, external);
    expect(config.addressType).toEqual("P2SH");
    expect(config.requiredSigners).toEqual(2);
    const derivation1: KeyOrigin = config.keyOrigins[0];
    const derivation2: KeyOrigin = config.keyOrigins[1];
    expect(derivation1).toStrictEqual(expectedKeys[0]);
    expect(derivation2).toStrictEqual(expectedKeys[1]);
  });
});

describe("encodeDescriptors", () => {
  it("should convert a config to descriptors", async () => {
    const config = {
      addressType: "P2SH",
      keyOrigins: expectedKeys,
      requiredSigners: 2,
      network: "mainnet",
    } as MultisigWalletConfig;
    const actual = await encodeDescriptors(config);
    expect(actual.receive).toEqual(external);
    expect(actual.change).toEqual(internal);
  });
});
