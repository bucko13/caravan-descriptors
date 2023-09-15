import * as caravan from "../caravan-rs/pkg"

type BitcoinNetwork = "bitcoin" | "testnet" | "regtest" | "signet"

export const decode_descriptor = (internal: string, external: string, network: BitcoinNetwork) => {
  let _network = caravan.Network.from_str(network);
  let external_descriptor = caravan.ExtendedDescriptor.from_str(external);
  let internal_descriptor = caravan.ExtendedDescriptor.from_str(internal);
  let config = caravan.CaravanConfig.new(_network, external_descriptor, internal_descriptor, "test1","public");

  return config.to_string_pretty()
}

// TODO: support wallet policies somehow so we only need one descriptor
// TODO: types for config, network, etc.
