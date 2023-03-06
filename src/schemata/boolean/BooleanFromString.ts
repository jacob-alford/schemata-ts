/**
 * A boolean value whose encoded representation is either "true" or "false".
 *
 * @since 1.0.0
 */
import { pipe } from 'fp-ts/function'
import { boolean } from 'schemata-ts/Guard'
import * as PB from 'schemata-ts/PatternBuilder'
import { make, Schema } from 'schemata-ts/Schema'

/**
 * @since 1.0.0
 * @category Model
 */
export type BooleanS = Schema<string, boolean>

/**
 * @since 1.0.0
 * @category Pattern
 */
export const booleanFromStringPattern: PB.Pattern = PB.oneOf(
  PB.exactString('true'),
  PB.exactString('false'),
)

/**
 * A boolean value whose encoded representation is either "true" or "false".
 *
 * @since 1.0.0
 * @category Schema
 */
export const BooleanFromString: BooleanS = make(s =>
  pipe(
    s.pattern(booleanFromStringPattern, 'BooleanFromString'),
    s.imap(boolean, 'BooleanFromString')(
      s => s === 'true',
      b => (b ? 'true' : 'false'),
    ),
  ),
)
