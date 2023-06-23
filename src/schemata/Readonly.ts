/** @since 1.4.0 */
import { identity } from 'fp-ts/function'
import { type Schema } from 'schemata-ts/Schema'

/**
 * Marks a schema as readonly.
 *
 * @since 1.0.0
 * @category Combinators
 */
export const Readonly: <I, O>(inner: Schema<I, O>) => Schema<Readonly<I>, Readonly<O>> =
  identity
