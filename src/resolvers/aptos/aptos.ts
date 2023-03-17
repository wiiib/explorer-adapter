import { createResolver } from '../../createResolver'

/**
 * A resolver for the Aptos Explorer.
 * @see {@link https://explorer.aptoslabs.com/}
 */
export const aptosResolver = createResolver({
  address: ({ address }) => `/account/${address}`, // = account, nftToken, nftContract, token, contract

  tx: ({ hash }) => `/txn/${hash}`,
  block: ({ id }) => `/block/${id}`,
})
