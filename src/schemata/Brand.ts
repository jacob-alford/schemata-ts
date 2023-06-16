import { constant, identity } from 'fp-ts/function'
import { Branded } from 'schemata-ts/brand'
import { Schema } from 'schemata-ts/Schema'

/**
 * A schema for branding an inner schema
 *
 * @since 1.0.0
 */
export const Brand: <Brand>() => <I, O>(
  inner: Schema<I, O>,
) => Schema<Branded<I, Brand>, Branded<O, Brand>> = constant(identity)
