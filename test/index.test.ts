import { KeyDerivation, decode_descriptor } from "../src";

test("decode_descriptor works", () => {
  const external =
    "sh(sortedmulti(2,[f57ec65d/45'/0'/100']xpub6CCHViYn5VzPfSR7baop9FtGcbm3UnqHwa54Z2eNvJnRFCJCdo9HtCYoLJKZCoATMLUowDDA1BMGfQGauY3fDYU3HyMzX4NDkoLYCSkLpbH/0/*,[efa5d916/45'/0'/100']xpub6Ca5CwTgRASgkXbXE5TeddTP9mPCbYHreCpmGt9dhz9y6femstHGCoFESHHKKRcm414xMKnuLjP9LDS7TwaJC9n5gxua6XB1rwPcC6hqDub/0/*))#uxj9xxul";
  const internal =
    "sh(sortedmulti(2,[f57ec65d/45'/0'/100']xpub6CCHViYn5VzPfSR7baop9FtGcbm3UnqHwa54Z2eNvJnRFCJCdo9HtCYoLJKZCoATMLUowDDA1BMGfQGauY3fDYU3HyMzX4NDkoLYCSkLpbH/1/*,[efa5d916/45'/0'/100']xpub6Ca5CwTgRASgkXbXE5TeddTP9mPCbYHreCpmGt9dhz9y6femstHGCoFESHHKKRcm414xMKnuLjP9LDS7TwaJC9n5gxua6XB1rwPcC6hqDub/1/*))#3hxf9z66";
  const config = decode_descriptor(internal, external);
  expect(config.addressType).toEqual("P2SH");
  expect(config.requiredSigners).toEqual(2);
  const derivation1: KeyDerivation = config.extendedPublicKeys[0];
  const derivation2: KeyDerivation = config.extendedPublicKeys[1];
  expect(derivation1).toStrictEqual({
    xfp: "f57ec65d",
    bip32Path: "m/45'/0'/100'",
    xpub: "xpub6CCHViYn5VzPfSR7baop9FtGcbm3UnqHwa54Z2eNvJnRFCJCdo9HtCYoLJKZCoATMLUowDDA1BMGfQGauY3fDYU3HyMzX4NDkoLYCSkLpbH",
  });
  expect(derivation2).toStrictEqual({
    xfp: "efa5d916",
    bip32Path: "m/45'/0'/100'",
    xpub: "xpub6Ca5CwTgRASgkXbXE5TeddTP9mPCbYHreCpmGt9dhz9y6femstHGCoFESHHKKRcm414xMKnuLjP9LDS7TwaJC9n5gxua6XB1rwPcC6hqDub",
  });
});
