/**
 * Representing a Base64-encoded string.
 *
 * For a URL-safe version, @see Base64UrlSafe module
 *
 * This module is heavily inspired by the `validator.js` module
 * [`isBase64`](https://github.com/validatorjs/validator.js/blob/master/src/lib/isBase64.js).
 *
 * @since 0.0.2
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
 * @since 0.0.2
 * @internal
 */
interface Base64Brand {
  readonly Base64: unique symbol
}

/**
 * Representing a Base64-encoded string.
 *
 * For a URL-safe version, @see Base64Url module.
 *
 * Heavily inspired by the `validator.js` module
 * [`isBase64`](https://github.com/validatorjs/validator.js/blob/master/src/lib/isBase64.js).
 *
 * @since 0.0.2
 * @category Model
 */
export type Base64 = string & Base64Brand

/**
 * @since 0.0.2
 * @category Model
 */
export type SchemableParams<S> = HKT2<S, string, Base64>

/**
 * @since 0.0.2
 * @category Model
 */
export type SchemableParams1<S extends URIS> = Kind<S, Base64>

/**
 * @since 0.0.3
 * @category Model
 */
export type SchemableParams2<S extends URIS2> = Kind2<S, string, Base64>

/**
 * @since 0.0.2
 * @category Model
 */
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, Base64>

/**
 * @since 0.0.2
 * @internal
 */
const notBase64 = /[^A-Z0-9+/=]/i

/**
 * @since 0.0.2
 * @category Refinements
 */
export const isBase64 = (s: string): s is Base64 => {
  const len = s.length

  if (len % 4 !== 0 || notBase64.test(s)) {
    return false
  }

  const firstPaddingChar = s.indexOf('=')

  return (
    firstPaddingChar === -1 ||
    firstPaddingChar === len - 1 ||
    (firstPaddingChar === len - 2 && s[len - 1] === '=')
  )
}

/**
 * @since 0.0.2
 * @category Instances
 */
export const Decoder: SchemableParams2C<D.URI> = pipe(
  D.string,
  D.refine(isBase64, 'Base64')
)

/**
 * @since 0.0.2
 * @category Instances
 */
export const Eq: SchemableParams1<Eq_.URI> = Str.Eq

/**
 * @since 0.0.2
 * @category Instances
 */
export const Guard: SchemableParams1<G.URI> = pipe(G.string, G.refine(isBase64))

/**
 * @since 0.0.2
 * @category Instances
 */
export const TaskDecoder: SchemableParams2C<TD.URI> = pipe(
  TD.string,
  TD.refine(isBase64, 'Base64')
)

/**
 * @since 0.0.2
 * @category Instances
 */
export const Type: SchemableParams1<t.URI> = pipe(t.string, t.refine(isBase64, 'Base64'))

/**
 * @since 0.0.3
 * @category Instances
 */
export const Encoder: SchemableParams2<Enc.URI> = Enc.id()

/**
 * @since 0.0.3
 * @category Instances
 */
export const Arbitrary: SchemableParams1<Arb.URI> =
  fc.base64String() as Arb.Arbitrary<Base64>
