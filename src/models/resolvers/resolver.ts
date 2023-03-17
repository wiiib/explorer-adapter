import type { DomainResolver } from './domainResolver'

export type Resolver = {
  [key in keyof DomainResolver]: (base: string, ...options: Parameters<DomainResolver[key]>) => ReturnType<DomainResolver[key]>
}
