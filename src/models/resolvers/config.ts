import type { Path } from '../path'
import type { DomainResolver } from './domainResolver'

export type ResolverParsedConfig = {
  [key in keyof DomainResolver]: (...options: Parameters<DomainResolver[key]>) => Path
}

export type ResolverConfig =
  & Pick<ResolverParsedConfig, 'address' | 'tx' | 'block'>
  & Partial<Omit<ResolverParsedConfig, 'address' | 'tx' | 'block'>>
