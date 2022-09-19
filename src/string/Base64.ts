/**
 * Representing a Base64 encoded string. Strings are URL-safe by default, but can be made
 * non-safe by providing an option to the constructor, e.g...
 *
 * ```ts
 * const decoder = Base64.Decoder({ urlSafe: false })
 * ```
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
interface Base64Brand {
  readonly Base64: unique symbol
}

/**
 * Representing a Base64 encoded string.
 *
 * Heavily inspired by the `validator.js` module
 * [`isBase64`](https://github.com/validatorjs/validator.js/blob/master/src/lib/isBase64.js).
 *
 * @since 0.0.2
 * @category Model
 */
export type Base64 = string & Base64Brand

/**
 * @since 0.0.1
 * @category Model
 */
export type Base64SchemableOptions = {
  urlSafe: boolean
}

/**
 * @since 0.0.1
 * @category Model
 */
export type SchemableParams<S> = (options?: Base64SchemableOptions) => HKT<S, Base64>

/**
 * @since 0.0.1
 * @category Model
 */
export type SchemableParams1<S extends URIS> = (
  options?: Base64SchemableOptions
) => Kind<S, Base64>

/**
 * @since 0.0.1
 * @category Model
 */
export type SchemableParams2C<S extends URIS2> = (
  options?: Base64SchemableOptions
) => Kind2<S, unknown, Base64>

const notBase64 = /[^A-Z0-9+/=]/i
const urlSafeBase64 = /^[A-Z0-9_-]*$/i

const defaultBase64Options: Base64SchemableOptions = {
  urlSafe: true,
}

/**
 * @since 0.0.2
 * @category Refinements
 */
export const isBase64 =
  (options = defaultBase64Options) =>
  (s: string): s is Base64 => {
    const len = s.length

    if (options.urlSafe) {
      return urlSafeBase64.test(s)
    }

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
export const Decoder: SchemableParams2C<D.URI> = options =>
  pipe(D.string, D.refine(isBase64(options), 'Base64'))

/**
 * @since 0.0.2
 * @category Instances
 */
export const Eq: SchemableParams1<Eq_.URI> = () => Str.Eq

/**
 * @since 0.0.2
 * @category Instances
 */
export const Guard: SchemableParams1<G.URI> = options =>
  pipe(G.string, G.refine(isBase64(options)))

/**
 * @since 0.0.2
 * @category Instances
 */
export const TaskDecoder: SchemableParams2C<TD.URI> = options =>
  pipe(TD.string, TD.refine(isBase64(options), 'Base64'))

/**
 * @since 0.0.2
 * @category Instances
 */
export const Type: SchemableParams1<t.URI> = options =>
  pipe(t.string, t.refine(isBase64(options), 'Base64'))
