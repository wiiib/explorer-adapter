import { createResolver } from '../../createResolver'

/**
 * A resolver for the NEAR Explorer.
 * @see {@link https://explorer.near.org/}
 */
export const nearResolver = createResolver({
  address: ({ address }) => `/accounts/${address}`, // = nftToken, nftContract, token, contract, account

  tx: ({ hash }) => `/transactions/${hash}`,
  block: ({ id }) => `/blocks/${id}`,
})
