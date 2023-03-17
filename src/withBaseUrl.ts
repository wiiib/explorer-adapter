import type { Entry, InferKey } from '@voire/type-utils'
import type { DomainResolver, Resolver } from './models'

export const withBaseUrl = (resolver: Resolver, base: string): DomainResolver => {
  return Object.entries(resolver).reduce((domainResolver, [methodName, method]: Entry<InferKey<Resolver>, (base: string, ...options: unknown[]) => ReturnType<Resolver[keyof Resolver]>>) => {
    domainResolver[methodName] = (...options) => method(base, ...options)
    return domainResolver
  }, {} as DomainResolver)
}
