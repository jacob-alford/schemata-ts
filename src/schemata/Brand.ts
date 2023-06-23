/** @since 1.0.0 */
import { constant, identity, unsafeCoerce } from 'fp-ts/function'
import { type Branded } from 'schemata-ts/brand'
import { type Schema } from 'schemata-ts/Schema'

/**
 * A schema for branding an inner schema
 *
 * @since 1.0.0
 * @category Combinators
 */
export const Brand: <Brand>() => <I, O>(
  inner: Schema<I, O>,
) => Schema<Branded<I, Brand>, Branded<O, Brand>> = unsafeCoerce(constant(identity))
