/**
 * A boolean value whose encoded representation is either "true" or "false".
 *
 * @since 1.0.0
 */
import { pipe } from 'fp-ts/function'
import { getGuard } from 'schemata-ts/Guard'
import * as PB from 'schemata-ts/PatternBuilder'
import { Schema } from 'schemata-ts/Schema'
import { Boolean } from 'schemata-ts/schemata/Boolean'
import { Imap } from 'schemata-ts/schemata/Imap'
import { Pattern } from 'schemata-ts/schemata/Pattern'

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
export const BooleanFromString: Schema<string, boolean> = pipe(
  Pattern(booleanFromStringPattern, 'BooleanFromString'),
  Imap(
    getGuard(Boolean),
    s => s === 'true',
    b => (b ? 'true' : 'false'),
  ),
)
