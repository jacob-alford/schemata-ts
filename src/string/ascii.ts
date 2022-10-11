/**
 * A string in which every character is valid ASCII.
 *
 * This is heavily inspired by the `validator.js` module
 * [`isAscii`](https://github.com/validatorjs/validator.js/blob/master/src/lib/isAscii.js).
 *
 * @since 0.0.1
 */
import { Kind, Kind2, URIS, URIS2, HKT2 } from 'fp-ts/HKT'
import * as D from 'io-ts/Decoder'
import * as Enc from 'io-ts/Encoder'
import * as Eq_ from 'fp-ts/Eq'
import * as G from 'io-ts/Guard'
import * as Str from 'fp-ts/string'
import * as TD from 'io-ts/TaskDecoder'
import * as t from 'io-ts/Type'
import { pipe } from 'fp-ts/function'
import * as fc from 'fast-check'

import * as Arb from '../internal/ArbitraryBase'

/**
 * @since 0.0.1
 * @internal
 */
interface ASCIIBrand {
  readonly ASCII: unique symbol
}

/**
 * @since 0.0.1
 * @internal
 * @note Control characters are banned by ESLint by default, however
 * these special characters are valid ASCII (codes 0-31).
 * @see https://eslint.org/docs/latest/rules/no-control-regex
 */
const asciiRegex = /^[\x00-\x7F]+$/ // eslint-disable-line no-control-regex

/**
 * Represents strings that contain only valid ASCII characters.
 *
 * @since 0.0.1
 * @category Model
 */
export type ASCII = string & ASCIIBrand

/**
 * @since 0.0.1
 * @category Model
 */
export type SchemableParams<S> = HKT2<S, string, ASCII>

/**
 * @since 0.0.1
 * @category Model
 */
export type SchemableParams1<S extends URIS> = Kind<S, ASCII>

/**
 * @since 0.0.3
 * @category Model
 */
export type SchemableParams2<S extends URIS2> = Kind2<S, string, ASCII>

/**
 * @since 0.0.1
 * @category Model
 */
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, ASCII>

/**
 * @since 0.0.1
 * @category Refinements
 */
export const isAscii = (s: string): s is ASCII =>
  typeof s === 'string' && asciiRegex.test(s)

/**
 * @since 0.0.1
 * @category Instances
 */
export const Decoder: SchemableParams2C<D.URI> = pipe(
  D.string,
  D.refine(isAscii, 'ASCII')
)

/**
 * @since 0.0.1
 * @category Instances
 */
export const Eq: SchemableParams1<Eq_.URI> = Str.Eq

/**
 * @since 0.0.1
 * @category Instances
 */
export const Guard: SchemableParams1<G.URI> = pipe(G.string, G.refine(isAscii))

/**
 * @since 0.0.1
 * @category Instances
 */
export const TaskDecoder: SchemableParams2C<TD.URI> = pipe(
  TD.string,
  TD.refine(isAscii, 'ASCII')
)

/**
 * @since 0.0.1
 * @category Instances
 */
export const Type: SchemableParams1<t.URI> = pipe(t.string, t.refine(isAscii, 'ASCII'))

/**
 * @since 0.0.3
 * @category Instances
 */
export const Encoder: SchemableParams2<Enc.URI> = Enc.id()

/**
 * @since 0.0.3
 * @category Instances
 */
export const Arbitrary: SchemableParams1<Arb.URI> = fc.asciiString({
  minLength: 1,
}) as Arb.Arbitrary<ASCII>
