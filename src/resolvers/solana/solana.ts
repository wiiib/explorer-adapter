import { createResolver } from '../../createResolver'

/**
 * A resolver for the Solana Explorer.
 * @see {@link https://explorer.solana.com/}
 */
export const solanaResolver = createResolver({
  address: ({ address }) => `/address/${address}`, // = account
  token: ({ address }) => `/token/${address}`, // = nftToken, nftContract, contract

  tx: ({ hash }) => `/tx/${hash}`,
  block: ({ id }) => `/block/${id}`,
})
