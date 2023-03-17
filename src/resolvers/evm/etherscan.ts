import { createResolver } from '../../createResolver'

/**
 * A resolver for the Etherscan-based explorers.
 * @see {@link https://bscscan.com/}
 */
export const etherscanResolver = createResolver({
  address: ({ address }) => `/address/${address}`,

  contract: ({ address }) => `/address/${address}`,
  token: ({ address, tokenId }) => tokenId
    ? `/token/${address}?a=${tokenId}`
    : `/token/${address}`,

  tx: ({ hash }) => `/tx/${hash}`,
  block: ({ id }) => `/block/${id}`,

  // Defaults:
  // - nftContract = this.contract
  // - nftToken = this.token
})

/**
 * A resolver for the explorers based on the new version of Etherscan.
 * New `/nft` route for viewing tokens is supported.
 * @see {@link https://etherscan.io/}
*/
export const etherscanResolverNext = createResolver({
  address: ({ address }) => `/address/${address}`,

  contract: ({ address }) => `/address/${address}`,
  token: ({ address, tokenId }) => tokenId
    ? `/nft/${address}/${tokenId}`
    : `/token/${address}`,

  tx: ({ hash }) => `/tx/${hash}`,
  block: ({ id }) => `/block/${id}`,

  // Defaults:
  // - nftContract = this.contract
  // - nftToken = this.token
})
