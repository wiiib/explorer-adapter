import { createResolver } from '../../createResolver'

/**
 * A resolver for the {@link https://www.web3labs.com/sirato Epirus}-based explorers.
 * @see {@link https://palm.epirus.io/}
 */
export const epirusResolver = createResolver({
  address: ({ address }) => `/address/${address}`,

  contract: ({ address }) => `/contracts/${address}`,
  token: ({ address }) => `/tokens/${address}`,

  tx: ({ hash }) => `/transactions/${hash}`,
  block: ({ id }) => `/blocks/${id}`,

  // Defaults:
  // - nftContract = this.contract
  // - nftToken = this.token
})
