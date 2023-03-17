import type {
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

  contract: (options: ExploreContractOptions) => string
  nftContract: (options: ExploreContractOptions) => string
  token: (options: ExploreTokenOptions) => string
  nftToken: (options: ExploreTokenOptions) => string

  // Blockchain
  tx: (options: ExploreTransactionOptions) => string
  block: (options: ExploreBlockOptions) => string
}
