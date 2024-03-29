/** @since 1.0.0 */
import { pipe } from 'fp-ts/function'
import { deriveGuard } from 'schemata-ts/derivations/guard-schemable'
import { type Float as Floating } from 'schemata-ts/float'
import { type Schema } from 'schemata-ts/Schema'
import { Boolean } from 'schemata-ts/schemata/Boolean'
import { Float } from 'schemata-ts/schemata/Float'
import { Imap } from 'schemata-ts/schemata/Imap'

/**
 * A boolean value whose encoded representation is a number, where 0 is false and 1 is true.
 *
 * Strictly speaking, this will _decode_ any number (0 becomes false, and non-zero becomes
 * true), but will only _encode_ 0 and 1.
 *
 * @since 1.0.0
 * @category Conversion
 */
export const BooleanFromNumber: Schema<Floating, boolean> = pipe(
  Float(),
  Imap(
    deriveGuard(Boolean),
    n => n !== 0,
    b => (b ? 1 : 0) as Floating,
    'boolean',
  ),
)
