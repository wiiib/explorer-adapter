import { createResolver } from '../../createResolver'

/**
 * A resolver for the NEAR Explorer.
 * @see {@link https://explorer.near.org/}
 */
export const nearResolver = createResolver({
  address: ({ address }) => `/accounts/${address}`,

  tx: ({ hash }) => `/transactions/${hash}`,
  block: ({ id }) => `/blocks/${id}`,

  // Defaults:
  // - contract = this.address
  // - nftContract = this.address
  // - token = this.address
  // - nftToken = this.address
})
