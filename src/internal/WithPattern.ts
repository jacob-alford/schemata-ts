import { HKT2, Kind, Kind2, URIS, URIS2 } from 'fp-ts/HKT'
import { Pattern } from '../PatternBuilder'

export interface WithPatternHKT2<S> {
  readonly pattern: (pattern: Pattern, description: string) => HKT2<S, string, string>
}

export interface WithPattern2<S extends URIS2> {
  readonly pattern: (pattern: Pattern, description: string) => Kind2<S, string, string>
}

export interface WithPattern2C<S extends URIS2, E> {
  readonly pattern: (pattern: Pattern, description: string) => Kind2<S, E, string>
}

export interface WithPattern1<S extends URIS> {
  readonly pattern: (pattern: Pattern, description: string) => Kind<S, string>
}
