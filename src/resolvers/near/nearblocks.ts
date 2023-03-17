import { createResolver } from '../../createResolver'

/**
 * A resolver for the NearBlocks explorer.
 * @see {@link https://nearblocks.io/}
 */
export const nearblocksResolver = createResolver({
  address: ({ address }) => `/address/${address}`, // = account
  token: ({ address }) => `/token/${address}`, // = contract
  nftToken: ({ address, tokenId }) => tokenId // = nftContract
    ? `/nft-token/${address}/${tokenId}`
    : `/nft-token/${address}`,

  tx: ({ hash }) => `/txns/${hash}`,
  block: ({ id }) => `/blocks/${id}`,
})
