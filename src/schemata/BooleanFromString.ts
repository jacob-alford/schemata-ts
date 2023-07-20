/** @since 1.0.0 */
import { pipe } from 'fp-ts/function'
import * as k from 'kuvio'
import { deriveGuard } from 'schemata-ts/Guard'
import { type Schema } from 'schemata-ts/Schema'
import { Boolean } from 'schemata-ts/schemata/Boolean'
import { Imap } from 'schemata-ts/schemata/Imap'
import { Pattern } from 'schemata-ts/schemata/Pattern'

/**
 * @since 1.0.0
 * @category Pattern
 */
export const booleanFromStringPattern: k.Pattern = k.oneOf(
  k.exactString('true'),
  k.exactString('false'),
)

/**
 * A boolean value whose encoded representation is either "true" or "false".
 *
 * @since 1.0.0
 * @category Conversion
 */
export const BooleanFromString: Schema<string, boolean> = pipe(
  Pattern(booleanFromStringPattern, ["'true' | 'false'", 'boolean']),
  Imap(
    deriveGuard(Boolean),
    s => s === 'true',
    b => (b ? 'true' : 'false'),
  ),
)
