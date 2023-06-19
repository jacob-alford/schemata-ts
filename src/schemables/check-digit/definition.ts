import { Branded } from 'schemata-ts/brand'
import { SchemableKind, SchemableLambda } from 'schemata-ts/HKT'

/** @since 1.0.0 */
export type CheckDigitVerified = Branded<
  string,
  {
    readonly CheckDigitVerified: unique symbol
  }
>

export interface WithCheckDigit<S extends SchemableLambda> {
  readonly checkDigit: (
    algorithm: (s: string) => string,
    location: number | ((s: string) => number),
  ) => (
    target: SchemableKind<S, string, string>,
  ) => SchemableKind<S, CheckDigitVerified, CheckDigitVerified>
}
