import { createResolver } from '../../createResolver'

/**
 * A resolver for the {@link https://www.web3labs.com/sirato Epirus}-based explorers.
 * @see {@link https://palm.epirus.io/}
 */
export const epirusResolver = createResolver({
  address: ({ address }) => `/address/${address}`,
  account: ({ address }) => `/accounts/${address}`,
  contract: ({ address }) => `/contracts/${address}`,
  token: ({ address }) => `/tokens/${address}`, // = nftToken, nftContract

  tx: ({ hash }) => `/transactions/${hash}`,
  block: ({ id }) => `/blocks/${id}`,
})
