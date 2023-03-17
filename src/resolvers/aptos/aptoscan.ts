import { createResolver } from '../../createResolver'

/**
 * A resolver for the AptoScan explorer.
 * @see {@link https://aptoscan.com/}
 */
export const aptoscanResolver = createResolver({
  address: ({ address }) => `/address/${address}`,

  tx: ({ hash }) => `/version/${hash}`,
  block: ({ id }) => `/block/${id}`,

  // Defaults:
  // - contract = this.address
  // - nftContract = this.address
  // - token = this.address
  // - nftToken = this.address
})
