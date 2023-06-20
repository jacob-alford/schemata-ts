/**
 * Representing a Base64-encoded string.
 *
 * For a URL-safe version, @see Base64UrlSafe module
 *
 * @since 1.0.0
 */
import { pipe } from 'fp-ts/function'
import { type Branded } from 'schemata-ts/brand'
import * as PB from 'schemata-ts/PatternBuilder'
import { type Schema } from 'schemata-ts/Schema'
import { Brand } from 'schemata-ts/schemata/Brand'
import { Pattern } from 'schemata-ts/schemata/Pattern'
import { StringPadRight } from 'schemata-ts/schemata/StringPadRight'

interface Base64Brand {
  readonly Base64: unique symbol
}

/**
 * Representing a Base64-encoded string.
 *
 * For a URL-safe version, @see Base64UrlSafe module
 *
 * @since 1.0.0
 * @category Model
 */
export type Base64 = Branded<string, Base64Brand>

/** @internal */
const base64Characters = pipe(PB.alnum, PB.and(PB.characterClass(false, '+', '/')))

/**
 * /^([A-Za-z0-9+/]*?([=]{0,2}))$/
 *
 * @since 1.0.0
 * @category Pattern
 */
export const base64: PB.Pattern = pipe(
  base64Characters,
  PB.exactly(4),
  PB.subgroup,
  PB.anyNumber(),
  PB.then(pipe(base64Characters, PB.between(2, 4))),
  PB.then(pipe(PB.char('='), PB.between(0, 2))),
  PB.subgroup,
  PB.maybe,
)

/**
 * Representing a Base64-encoded string.
 *
 * For a URL-safe version, @see Base64UrlSafe module
 *
 * @since 1.0.0
 * @category Schema
 */
export const Base64: Schema<Base64> = pipe(
  Pattern(base64, 'Base64'),
  StringPadRight(
    {
      by: 'ExactLength',
      exactLength: s => s.length + ((4 - (s.length % 4)) % 4),
    },
    '=',
  ),
  Brand<Base64Brand>(),
)
