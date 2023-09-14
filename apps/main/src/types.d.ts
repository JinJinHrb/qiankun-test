import { keyGetterMap as profileGetterMap, keyDomainMap as profileDomainMap } from './profiles'

export type ProfileGetterMapValue = typeof profileGetterMap extends Map<string, infer I> ? I : never

export type ProfileDomainMapValue = typeof profileDomainMap extends Map<string, infer I> ? I : never
