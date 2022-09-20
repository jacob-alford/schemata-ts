/**
 * Representing a URL-safe, Base64 encoded string.
 *
 * For a non-URL-safe alternative, @see Base64
 *
 * This module is heavily inspired by the `validator.js` module
 * [`isBase64`](https://github.com/validatorjs/validator.js/blob/master/src/lib/isBase64.js).
 *
 * @since 0.0.2
 */
import { Kind, Kind2, URIS, URIS2, HKT } from 'fp-ts/HKT'
import * as D from 'io-ts/Decoder'
import * as Eq_ from 'fp-ts/Eq'
import * as G from 'io-ts/Guard'
import * as Str from 'fp-ts/string'
import * as TD from 'io-ts/TaskDecoder'
import * as t from 'io-ts/Type'
import { pipe } from 'fp-ts/function'

/**
 * @since 0.0.2
 * @category Internal
 */
interface Base64UrlBrand {
  readonly Base64Url: unique symbol
}

/**
 * Representing a URL-safe, Base64 encoded string.
 *
 * For a non-URL-safe alternative, @see Base64
 *
 * Heavily inspired by the `validator.js` module
 * [`isBase64`](https://github.com/validatorjs/validator.js/blob/master/src/lib/isBase64.js).
 *
 * @since 0.0.2
 * @category Model
 */
export type Base64Url = string & Base64UrlBrand

/**
 * @since 0.0.2
 * @category Model
 */
export type SchemableParams<S> = HKT<S, Base64Url>

/**
 * @since 0.0.2
 * @category Model
 */
export type SchemableParams1<S extends URIS> = Kind<S, Base64Url>

/**
 * @since 0.0.2
 * @category Model
 */
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, Base64Url>

/**
 * @since 0.0.2
 * @category Internal
 */
const urlSafeBase64 = /^[A-Z0-9_-]*$/i

/**
 * @since 0.0.2
 * @category Refinements
 */
export const isBase64Url = (s: string): s is Base64Url => urlSafeBase64.test(s)

/**
 * @since 0.0.2
 * @category Instances
 */
export const Decoder: SchemableParams2C<D.URI> = pipe(
  D.string,
  D.refine(isBase64Url, 'Base64Url')
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
export const Guard: SchemableParams1<G.URI> = pipe(G.string, G.refine(isBase64Url))

/**
 * @since 0.0.2
 * @category Instances
 */
export const TaskDecoder: SchemableParams2C<TD.URI> = pipe(
  TD.string,
  TD.refine(isBase64Url, 'Base64Url')
)

/**
 * @since 0.0.2
 * @category Instances
 */
export const Type: SchemableParams1<t.URI> = pipe(
  t.string,
  t.refine(isBase64Url, 'Base64Url')
)
