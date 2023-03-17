import type { Entry, InferKey } from '@voire/type-utils'
import { withLeadingSlash, withoutTrailingSlash } from 'ufo'
import type { Resolver, ResolverConfig, ResolverParsedConfig } from './models'

/**
 * Creates an explorer type's resolver form the provided config.
 *
 * @param config Object of urls making methods for different web3 entities.
 * Additionally, `createResolver` compliments config methods using default values:
 * - for **`account`** getter, `address` getter is used by default
 * - for **`token`** getter, `address` getter is used by default
 * - for **`contract`** getter, `token` or `address` getter is used by default
 * - for **`nftToken`** getter, `token` or `address` getter is used by default
 * - for **`nftContract`** getter, `nftToken`, `contract` or `address` getter is used by default
 *
 * @returns Set of method for an explorer type.
 */
export const createResolver = (config: ResolverConfig): Resolver => {
  const input: ResolverParsedConfig = {
    ...config,

    account: config.account ?? config.address,
    token: config.token ?? config.address,
    contract: config.contract ?? config.token ?? config.address,
    nftToken: config.nftToken ?? config.token ?? config.address,
    nftContract: config.nftContract ?? config.nftToken ?? config.contract ?? config.address,
  }

  return Object.entries(input).reduce((resolver, [methodName, method]: Entry<InferKey<ResolverConfig>, (...options: unknown[]) => ReturnType<ResolverConfig[keyof ResolverConfig]>>) => {
    resolver[methodName] = (base, ...options) => {
      const path = method(...options)
      return `${withoutTrailingSlash(base)}${withLeadingSlash(path)}`
    }

    return resolver
  }, {} as Resolver)
}
