import type {
  ExploreAccountOptions,
  ExploreAddressOptions,
  ExploreBlockOptions,
  ExploreContractOptions,
  ExploreTokenOptions,
  ExploreTransactionOptions,
} from '../options'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type DomainResolver = {
  // With addresses
  address: (options: ExploreAddressOptions) => string
  account: (options: ExploreAccountOptions) => string

  token: (options: ExploreTokenOptions) => string
  contract: (options: ExploreContractOptions) => string

  nftToken: (options: ExploreTokenOptions) => string
  nftContract: (options: ExploreContractOptions) => string

  // System
  tx: (options: ExploreTransactionOptions) => string
  block: (options: ExploreBlockOptions) => string
}
