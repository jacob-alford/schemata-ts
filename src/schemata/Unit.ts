/** @since 2.1.0 */
import { identity, pipe } from 'fp-ts/function'
import { deriveGuard } from 'schemata-ts/derivations/guard-schemable'
import { type Schema } from 'schemata-ts/Schema'
import { Imap } from 'schemata-ts/schemata/Imap'
import { Unknown } from 'schemata-ts/schemata/Unknown'

/**
 * Represents a type with a single inhabitant, undefined.
 *
 * Transcoders will permit any input and map it to `void`. Useful for decoding return
 * types where the value is not intended to be used.
 *
 * @since 2.1.0
 * @category Unit
 */
export const Unit: Schema<void> = pipe(
  Unknown,
  Imap(deriveGuard(Unknown), () => undefined, identity),
) as Schema<void>
