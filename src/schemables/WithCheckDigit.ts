/**
 * Schemable for constructing a string with a check digit (e.g. ISBN or Credit Card)
 *
 * @since 1.0.0
 */
import * as D from '../internal/DecoderBase'
import * as Enc from '../internal/EncoderBase'
import * as Eq_ from 'fp-ts/Eq'
import * as G from '../internal/GuardBase'
import * as TD from '../internal/TaskDecoderBase'
import * as t from '../internal/TypeBase'
import * as Arb from '../internal/ArbitraryBase'
import * as SC from '../SchemaExt'
import { HKT2, Kind, Kind2, URIS, URIS2 } from 'fp-ts/HKT'
import { Branded } from 'io-ts'
import { identity, pipe } from 'fp-ts/function'
import * as E from 'fp-ts/Either'
import * as TE from 'fp-ts/TaskEither'

/**
 * @since 1.0.0
 * @internal
 */
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
    location: number | ((s: string) => number)
  ) => <O>(target: HKT2<S, O, string>) => HKT2<S, O, Branded<string, CheckDigitVerified>>
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithCheckDigit1<S extends URIS> {
  readonly checkDigit: (
    algorithm: (s: string) => string,
    location: number | ((s: string) => number)
  ) => (target: Kind<S, string>) => Kind<S, Branded<string, CheckDigitVerified>>
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithCheckDigit2<S extends URIS2> {
  readonly checkDigit: (
    algorithm: (s: string) => string,
    location: number | ((s: string) => number)
  ) => <O>(
    target: Kind2<S, O, string>
  ) => Kind2<S, O, Branded<string, CheckDigitVerified>>
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithCheckDigit2C<S extends URIS2, E> {
  readonly checkDigit: (
    algorithm: (s: string) => string,
    location: number | ((s: string) => number)
  ) => (target: Kind2<S, E, string>) => Kind2<S, E, Branded<string, CheckDigitVerified>>
}

const replaceCharAt = (s: string, i: number, c: string): string =>
  s.substring(0, i) + c + s.substring(i + 1)

const locationToIndex = (s: string, location: number | ((s: string) => number)): number =>
  typeof location === 'number' ? location : location(s)

/**
 * @since 1.0.0
 * @category Instances
 */
export const Arbitrary: WithCheckDigit1<Arb.URI> = {
  checkDigit: (algorithm, location) => arb =>
    arb.map(
      s =>
        replaceCharAt(s, locationToIndex(s, location), algorithm(s)) as Branded<
          string,
          CheckDigitVerified
        >
    ),
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Decoder: WithCheckDigit2C<D.URI, unknown> = {
  checkDigit: (algorithm, location) => dec => ({
    decode: s =>
      pipe(
        dec.decode(s),
        E.chain(
          E.fromPredicate(
            (s): s is Branded<string, CheckDigitVerified> =>
              s[locationToIndex(s, location)] === algorithm(s),
            s => D.error(s, replaceCharAt(s, locationToIndex(s, location), algorithm(s)))
          )
        )
      ),
  }),
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Encoder: WithCheckDigit2<Enc.URI> = {
  checkDigit: () => identity,
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Eq: WithCheckDigit1<Eq_.URI> = {
  checkDigit: () => identity,
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Guard: WithCheckDigit1<G.URI> = {
  checkDigit: (algorithm, location) => guard => ({
    is: (s): s is Branded<string, CheckDigitVerified> =>
      guard.is(s) && s[locationToIndex(s, location)] === algorithm(s),
  }),
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const TaskDecoder: WithCheckDigit2C<TD.URI, unknown> = {
  checkDigit: (algorithm, location) => dec => ({
    decode: s =>
      pipe(
        dec.decode(s),
        TE.chain(
          TE.fromPredicate(
            (s): s is Branded<string, CheckDigitVerified> =>
              s[locationToIndex(s, location)] === algorithm(s),
            s => TD.error(s, replaceCharAt(s, locationToIndex(s, location), algorithm(s)))
          )
        )
      ),
  }),
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Type: WithCheckDigit1<t.URI> = {
  checkDigit: (algorithm, location) => type =>
    pipe(
      type,
      t.refine(
        (s): s is Branded<string, CheckDigitVerified> =>
          s[locationToIndex(s, location)] === algorithm(s),
        'checkDigit'
      )
    ),
}

/**
 * @since 1.0.0
 * @category Combinators
 */
export const Schema =
  (algorithm: (s: string) => string, location: number) =>
  <O>(
    schema: SC.SchemaExt<O, string>
  ): SC.SchemaExt<O, Branded<string, CheckDigitVerified>> =>
    SC.make(s => s.checkDigit(algorithm, location)<O>(schema(s)))
