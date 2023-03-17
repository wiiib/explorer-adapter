import { createResolver } from '../../createResolver'

/**
 * A resolver for the {@link https://github.com/blockscout/blockscout Blockscout}-based explorers.
 * @see {@link https://explorer.palm.io/}
 * @see {@link https://blockscout.com/xdai/mainnet/}
 */
export const blockscoutResolver = createResolver({
  address: ({ address }) => `/address/${address}`, // = account
  token: ({ address, tokenId }) => tokenId // = nftToken, nftContract, contract
    ? `/token/${address}/instance/${tokenId}`
    : `/token/${address}`,

  tx: ({ hash }) => `/tx/${hash}`,
  block: ({ id }) => `/block/${id}`,
})
