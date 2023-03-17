import { createResolver } from '../../createResolver'

/**
 * A resolver for the SolScan explorer.
 * @see {@link https://solscan.io/}
 */
export const solscanResolver = createResolver({
  address: ({ address }) => `/account/${address}`, // = account
  token: ({ address }) => `/token/${address}`, // = nftToken, contract
  nftContract: ({ address }) => `/collection/${address}`,

  tx: ({ hash }) => `/tx/${hash}`,
  block: ({ id }) => `/block/${id}`,
})
