import { createResolver } from '../../createResolver'

/**
 * A resolver for the Solana Explorer.
 * @see {@link https://explorer.solana.com/}
 */
export const solanaResolver = createResolver({
  address: ({ address }) => `/address/${address}`,

  tx: ({ hash }) => `/tx/${hash}`,
  block: ({ id }) => `/block/${id}`,

  // Defaults:
  // - contract (aka program) = this.address
  // - nftContract (aka program) = this.address
  // - token = this.address
  // - nftToken = this.address
})
