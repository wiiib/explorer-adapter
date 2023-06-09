import { createResolver } from '../../createResolver'

/**
 * A resolver for the Aptos Explorer.
 * @see {@link https://explorer.aptoslabs.com/}
 */
export const aptosResolver = createResolver({
  address: ({ address }) => `/account/${address}`,

  tx: ({ hash }) => `/txn/${hash}`,
  block: ({ id }) => `/block/${id}`,

  // Defaults:
  // - contract = this.address
  // - nftContract = this.address
  // - token = this.address
  // - nftToken = this.address
})
