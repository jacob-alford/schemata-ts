/**
 * Schemable for constructing a string with a check digit (e.g. ISBN or Credit Card)
 *
 * @since 1.0.0
 */
import { HKT2, Kind, Kind2, URIS, URIS2 } from 'fp-ts/HKT'
import { Branded } from 'schemata-ts/brand'

/** @since 1.0.0 */
export interface CheckDigitVerified {
  readonly CheckDigitVerified: unique symbol
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithCheckDigitHKT2<S> {
  readonly checkDigit: (
    algorithm: (s: string) => string,
    location: number | ((s: string) => number),
  ) => <O>(target: HKT2<S, O, string>) => HKT2<S, O, Branded<string, CheckDigitVerified>>
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithCheckDigit1<S extends URIS> {
  readonly checkDigit: (
    algorithm: (s: string) => string,
    location: number | ((s: string) => number),
  ) => (target: Kind<S, string>) => Kind<S, Branded<string, CheckDigitVerified>>
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithCheckDigit2<S extends URIS2> {
  readonly checkDigit: (
    algorithm: (s: string) => string,
    location: number | ((s: string) => number),
  ) => <O>(
    target: Kind2<S, O, string>,
  ) => Kind2<S, O, Branded<string, CheckDigitVerified>>
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithCheckDigit2C<S extends URIS2, E> {
  readonly checkDigit: (
    algorithm: (s: string) => string,
    location: number | ((s: string) => number),
  ) => (target: Kind2<S, E, string>) => Kind2<S, E, Branded<string, CheckDigitVerified>>
}
