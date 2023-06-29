/** @since 1.0.0 */
import { pipe } from 'fp-ts/function'
import { type Branded } from 'schemata-ts/brand'
import * as PB from 'schemata-ts/PatternBuilder'
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
 * A single base64 character, excluding padding characters
 *
 * @since 1.0.0
 */
export const base64Character = pipe(PB.alnum, PB.and(PB.characterClass(false, '+', '/')))

/**
 * Matches a base64 string, with or without trailing '=' characters. However, if they are
 * present, they must be correct (i.e. pad out the string so its length is a multiple of 4)
 *
 * @since 1.0.0
 * @category Pattern
 */
export const base64: PB.Pattern = pipe(
  base64Character,
  PB.exactly(4),
  PB.subgroup,
  PB.anyNumber(),
  PB.then(
    PB.maybe(
      PB.subgroup(
        PB.oneOf(
          PB.sequence(PB.exactly(2)(base64Character), PB.exactly(2)(PB.char('='))),
          PB.sequence(PB.exactly(3)(base64Character), PB.char('=')),
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
