/**
 * Schemable for constructing a string with a check digit (e.g. ISBN or Credit Card)
 *
 * @since 1.0.0
 */
import { Branded } from 'schemata-ts/brand'
import { Kind, TypeLambda } from 'schemata-ts/HKT'

/** @since 1.0.0 */
export interface CheckDigitVerified {
  readonly CheckDigitVerified: unique symbol
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithCheckDigit<S extends TypeLambda> {
  readonly checkDigit: (
    algorithm: (s: string) => string,
    location: number | ((s: string) => number),
  ) => <O>(target: Kind<S, O, string>) => Kind<S, O, Branded<string, CheckDigitVerified>>
}
