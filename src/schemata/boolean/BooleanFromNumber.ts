/**
 * A boolean value whose encoded representation is a number, where 0 is false and 1 is true.
 *
 * Strictly speaking, this will _decode_ any number (0 becomes false, and non-zero becomes
 * true), but will only _encode_ 0 and 1.
 *
 * @since 1.0.0
 */
import { boolean } from 'io-ts/lib/Guard'
import { make, SchemaExt } from 'schemata-ts/SchemaExt'

/**
 * @since 1.0.0
 * @category Model
 */
export type BooleanS = SchemaExt<number, boolean>

/**
 * A boolean value whose encoded representation is a number, where 0 is false and 1 is true.
 *
 * Strictly speaking, this will _decode_ any number (0 becomes false, and non-zero becomes
 * true), but will only _encode_ 0 and 1.
 *
 * @since 1.0.0
 * @category Schema
 */
export const BooleanFromNumber: BooleanS = make(s =>
  s.imap(boolean, 'BooleanFromNumber')(
    n => n !== 0,
    b => (b ? 1 : 0),
  )(s.number),
)
