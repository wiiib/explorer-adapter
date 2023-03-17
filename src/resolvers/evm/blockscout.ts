import { createResolver } from '../../createResolver'

/**
 * A resolver for the {@link https://github.com/blockscout/blockscout Blockscout}-based explorers.
 * @see {@link https://explorer.palm.io/}
 * @see {@link https://blockscout.com/xdai/mainnet/}
 */
export const blockscoutResolver = createResolver({
  address: ({ address }) => `/address/${address}`,

  contract: ({ address }) => `/address/${address}`,
  token: ({ address, tokenId }) => tokenId
    ? `/token/${address}/instance/${tokenId}`
    : `/token/${address}`,

  tx: ({ hash }) => `/tx/${hash}`,
  block: ({ id }) => `/block/${id}`,

  // Defaults:
  // - nftContract = this.contract
  // - nftToken = this.token
})
