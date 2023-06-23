import { type Branded } from 'schemata-ts/brand'
import { type SchemableKind, type SchemableLambda } from 'schemata-ts/internal/schemable'

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
