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
import { Schema } from 'schemata-ts/Schema'
import { Brand } from 'schemata-ts/schemata/Brand'
import { Pattern } from 'schemata-ts/schemata/Pattern'

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
export const Base64Url: Schema<Base64Url, Base64Url> = Brand<Base64UrlBrand>()(
  Pattern(base64Url, 'Base64Url'),
)
