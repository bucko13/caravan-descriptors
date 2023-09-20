import bdkPromise from "./wasmLoader";
import { BitcoinNetwork, MultisigAddressType } from "unchained-bitcoin";

// TODO: should come from unchained-wallets
export interface KeyOrigin {
  xfp: string;
  bip32Path: string;
  xpub: string;
}

// should be a 32 byte hex string
export type PolicyHmac = string;
// should be an 8 byte hex string
export type RootFingerprint = string;

export interface MultisigWalletConfig {
  requiredSigners: number;
  addressType: MultisigAddressType;
  keyOrigins: KeyOrigin[];
  network: BitcoinNetwork;
}

export const decodeDescriptors = async (
  internal: string,
  external: string,
  network: BitcoinNetwork = "mainnet",
): Promise<MultisigWalletConfig> => {
  const { ExtendedDescriptor, CaravanConfig, Network } = await bdkPromise;
  const external_descriptor = ExtendedDescriptor.from_str(external);
  const internal_descriptor = ExtendedDescriptor.from_str(internal);
  let _network: BitcoinNetwork | "bitcoin";
  if (network === "mainnet") {
    _network = "bitcoin";
  } else {
    _network = network;
  }
  const config = CaravanConfig.new(
    Network.from_str(_network),
    external_descriptor,
    internal_descriptor,
    "test1",
    "public",
  );
  const configObj = JSON.parse(config.to_string_pretty());
  const requiredSigners = configObj.quorum.requiredSigners;
  const keyOrigins = configObj.extendedPublicKeys.map(
    ({ bip32Path, xpub, xfp }: KeyOrigin): KeyOrigin => ({
      bip32Path,
      xpub,
      xfp,
    }),
  );

  return {
    addressType: config.address_type() as MultisigAddressType,
    requiredSigners,
    keyOrigins,
    network: "mainnet",
  };
};

export const encodeDescriptors = async (
  config: MultisigWalletConfig,
): Promise<{ receive: string; change: string }> => {
  const bdk = await bdkPromise;
  const { MultisigWalletConfig: RsWalletConfig } = bdk;
  const wallet = RsWalletConfig.from_str(JSON.stringify(config));

  return {
    receive: wallet.external_descriptor().to_string(),
    change: wallet.internal_descriptor().to_string(),
  };
};
