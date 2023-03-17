import { createResolver } from '../../createResolver'

/**
 * A resolver for the NearBlocks explorer.
 * @see {@link https://nearblocks.io/}
 */
export const nearblocksResolver = createResolver({
  address: ({ address }) => `/address/${address}`,

  contract: ({ address }) => `/address/${address}`,
  nftContract: ({ address }) => `/nft-token/${address}`,
  token: ({ address, tokenId }) => tokenId
    ? `/nft-token/${address}/${tokenId}`
    : `/token/${address}`,
  nftToken: ({ address, tokenId }) => tokenId
    ? `/nft-token/${address}/${tokenId}`
    : `/nft-token/${address}`,

  tx: ({ hash }) => `/txns/${hash}`,
  block: ({ id }) => `/blocks/${id}`,
})
