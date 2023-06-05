/**
 * A boolean value whose encoded representation is a number, where 0 is false and 1 is true.
 *
 * Strictly speaking, this will _decode_ any number (0 becomes false, and non-zero becomes
 * true), but will only _encode_ 0 and 1.
 *
 * @since 1.0.0
 */
import { getGuard } from 'schemata-ts/derivations/guard-schemable'
import { Schema } from 'schemata-ts/Schema'
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
 * @category Schema
 */
export const BooleanFromNumber: Schema<number, boolean> = Imap(
  getGuard(Boolean),
  n => n !== 0,
  b => (b ? 1 : 0),
)(Float())
