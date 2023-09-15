import * as caravan from "../caravan-rs/pkg"
import { MultisigAddressType } from "unchained-bitcoin";

// TODO: should come from unchained-wallets
export interface KeyDerivation {
  xfp: string;
  bip32Path: string;
  xpub: string;
}

// should be a 32 byte hex string
export type PolicyHmac = string;
// should be an 8 byte hex string
export type RootFingerprint = string;

export interface DescriptorConfig {
  requiredSigners: number;
  addressType: MultisigAddressType;
  extendedPublicKeys: KeyDerivation[];
}

export const decode_descriptor = (internal: string, external: string) => {
  const external_descriptor = caravan.ExtendedDescriptor.from_str(external);
  const internal_descriptor = caravan.ExtendedDescriptor.from_str(internal);
  const config = caravan.CaravanConfig.new(
    caravan.Network.from_str("bitcoin"),
    external_descriptor,
    internal_descriptor,
    "test1",
    "public",
  );
  const configObj = JSON.parse(config.to_string_pretty());
  const requiredSigners = configObj.quorum.requiredSigners;

  const extendedPublicKeys = configObj.extendedPublicKeys.map(
    ({ bip32Path, xpub, xfp }: KeyDerivation): KeyDerivation => ({
      bip32Path,
      xpub,
      xfp,
    }),
  );

  return {
    addressType: config.address_type(),
    requiredSigners,
    extendedPublicKeys,
  };
};

// TODO: support wallet policies somehow so we only need one descriptor
// TODO: types for config, network, etc.
