/** @since 1.0.0 */
import * as k from 'kuvio'
import { type Branded } from 'schemata-ts/brand'
import { type Schema } from 'schemata-ts/Schema'
import { Brand } from 'schemata-ts/schemata/Brand'
import { Pattern } from 'schemata-ts/schemata/Pattern'

interface Base64UrlBrand {
  readonly Base64Url: unique symbol
}

/**
 * Represents a URL-safe, Base64 encoded string.
 *
 * For a non-URL-safe alternative, @see Base64
 *
 * @since 1.0.0
 * @category Model
 */
export type Base64Url = Branded<string, Base64UrlBrand>

/**
 * Represents a URL-safe, Base64 encoded string.
 *
 * For a non-URL-safe alternative, @see Base64
 *
 * @since 1.0.0
 * @category String
 */
export const Base64Url: Schema<Base64Url> = Brand<Base64UrlBrand>()(
  Pattern(k.patterns.base64Url, 'Base64Url'),
)
