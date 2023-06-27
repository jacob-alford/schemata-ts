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

export const base64Character = pipe(k.alnum, k.and(k.characterClass(false, '+', '/')))

/**
 * Matches a base64 string, with or without trailing '=' characters. However, if they are
 * present, they must be correct (i.e. pad out the string so its length is a multiple of 4)
 *
 * @since 1.0.0
 * @category Pattern
 */
export const base64: k.Pattern = pipe(
  base64Character,
  k.exactly(4),
  k.subgroup,
  k.anyNumber(),
  k.then(
    k.maybe(
      k.subgroup(
        k.oneOf(
          k.sequence(k.exactly(2)(base64Character), k.exactly(2)(k.char('='))),
          k.sequence(k.exactly(3)(base64Character), k.char('=')),
        ),
      ),
    ),
  ),
)

/**
 * Represents a Base64-encoded string.
 *
 * For a URL-safe version, @see Base64UrlSafe module
 *
 * @since 1.0.0
 * @category String
 */
export const Base64: Schema<Base64> = pipe(
  Pattern(base64, 'Base64'),
  Brand<Base64Brand>(),
)
