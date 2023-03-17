import type { DomainResolver, Resolver } from './models'

export const createAdapter = <T extends Record<string, Resolver> | Record<string, DomainResolver>>(config: T) => config
