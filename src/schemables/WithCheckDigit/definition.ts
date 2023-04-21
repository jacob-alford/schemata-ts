import { Branded } from 'schemata-ts/brand'
import { SchemableKind, SchemableLambda } from 'schemata-ts/HKT'

/** @since 1.0.0 */
export interface CheckDigitVerified {
  readonly CheckDigitVerified: unique symbol
}

export interface WithCheckDigit<S extends SchemableLambda> {
  readonly checkDigit: (
    algorithm: (s: string) => string,
    location: number | ((s: string) => number),
  ) => <O>(
    target: SchemableKind<S, O, string>,
  ) => SchemableKind<S, O, Branded<string, CheckDigitVerified>>
}
