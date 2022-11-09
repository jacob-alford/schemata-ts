/**
 * Representing a URL-safe, Base64 encoded string.
 *
 * For a non-URL-safe alternative, @see Base64
 *
 * @since 1.0.0
 */

import * as PB from '../../PatternBuilder'
import { make, SchemaExt } from '../../SchemaExt'
import { Brand } from 'io-ts'
import { pipe } from 'fp-ts/function'

/** @internal */
type Base64UrlBrand = Brand<{ readonly Base64Url: unique symbol }['Base64Url']>

/**
 * Representing a URL-safe, Base64 encoded string.
 *
 * For a non-URL-safe alternative, @see Base64
 *
 * @since 1.0.0
 * @category Model
 */
export type Base64Url = string & Base64UrlBrand

/**
 * @since 1.0.0
 * @category Model
 */
export type Base64UrlS = SchemaExt<string, Base64Url>

/**
 * /^[A-Za-z0-9_-]*$/
 *
 * @since 1.0.0
 * @category Pattern
 */
export const base64Url: PB.Pattern = pipe(
  PB.word,
  PB.and('-'),
  PB.anyNumber({ greedy: true }),
)

/**
 * Representing a URL-safe, Base64 encoded string.
 *
 * For a non-URL-safe alternative, @see Base64
 *
 * @since 1.0.0
 * @category Schema
 */
export const Base64Url: Base64UrlS = make(s =>
  s.brand<Base64UrlBrand>()(s.pattern(base64Url, 'Base64Url')),
)
