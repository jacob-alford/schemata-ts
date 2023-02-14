/**
 * Representing a URL-safe, Base64 encoded string.
 *
 * For a non-URL-safe alternative, @see Base64
 *
 * @since 1.0.0
 */
import { pipe } from 'fp-ts/function'
import { Branded } from 'schemata-ts/brand'
import * as PB from 'schemata-ts/PatternBuilder'
import { make, SchemaExt } from 'schemata-ts/SchemaExt'

interface Base64UrlBrand {
  readonly Base64Url: unique symbol
}

/**
 * Representing a URL-safe, Base64 encoded string.
 *
 * For a non-URL-safe alternative, @see Base64
 *
 * @since 1.0.0
 * @category Model
 */
export type Base64Url = Branded<string, Base64UrlBrand>

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
