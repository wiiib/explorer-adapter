import type { DomainResolver, Resolver } from './models'

export const createAdapter = <T extends Record<string, Resolver | DomainResolver>>(config: T) => config
