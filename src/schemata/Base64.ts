/** @since 1.0.0 */
import { pipe } from 'fp-ts/function'
import * as k from 'kuvio'
import { type Branded } from 'schemata-ts/brand'
import { type Schema } from 'schemata-ts/Schema'
import { Brand } from 'schemata-ts/schemata/Brand'
import { Pattern } from 'schemata-ts/schemata/Pattern'

interface Base64Brand {
  readonly Base64: unique symbol
}

/**
 * Represents a Base64-encoded string.
 *
 * For a URL-safe version, @see Base64UrlSafe module
 *
 * @since 1.0.0
 * @category Model
 */
export type Base64 = Branded<string, Base64Brand>

/**
 * Represents a Base64-encoded string.
 *
 * For a URL-safe version, @see Base64UrlSafe module
 *
 * @since 1.0.0
 * @category String
 */
export const Base64: Schema<Base64> = pipe(
  Pattern(k.patterns.base64, 'Base64'),
  Brand<Base64Brand>(),
)
