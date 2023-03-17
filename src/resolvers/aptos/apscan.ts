import { createResolver } from '../../createResolver'

/**
 * A resolver for the Apscan explorer.
 * @see {@link https://apscan.io/}
 */
export const apscanResolver = createResolver({
  address: ({ address }) => `/account/${address}`,

  tx: ({ hash }) => `/tx/${hash}`,
  block: ({ id }) => `/block/${id}`,

  // Defaults:
  // - contract = this.address
  // - nftContract = this.address
  // - token = this.address
  // - nftToken = this.address
})
