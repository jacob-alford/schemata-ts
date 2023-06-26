/** @since 1.4.0 */
import { type Schema } from 'schemata-ts/Schema'
import { Annotate } from 'schemata-ts/schemata/Annotate'

/**
 * Marks a schema as readonly.
 *
 * @since 1.0.0
 * @category Combinators
 */
export const Readonly: <I, O>(inner: Schema<I, O>) => Schema<Readonly<I>, Readonly<O>> =
  Annotate({
    readOnly: true,
  })
