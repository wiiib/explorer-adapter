import type { NumberLike } from '@voire/type-utils'

export interface ExploreAddressOptions {
  address: string
}

export type ExploreContractOptions = ExploreAddressOptions
export type ExploreAccountOptions = ExploreAddressOptions

export interface ExploreTokenOptions extends ExploreAddressOptions {
  tokenId?: NumberLike
}

export interface ExploreTransactionOptions {
  hash: string
}

export interface ExploreBlockOptions {
  /**
   * Hash or height
   */
  id: string | number
}
