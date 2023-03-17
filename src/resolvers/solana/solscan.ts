import { createResolver } from '../../createResolver'

/**
 * A resolver for the SolScan explorer.
 * @see {@link https://solscan.io/}
 */
export const solscanResolver = createResolver({
  address: ({ address }) => `/account/${address}`,

  contract: ({ address }) => `/account/${address}`,
  nftContract: ({ address }) => `/collection/${address}`,
  token: ({ address }) => `/token/${address}`,
  nftToken: ({ address }) => `/token/${address}`,

  tx: ({ hash }) => `/tx/${hash}`,
  block: ({ id }) => `/block/${id}`,
})
