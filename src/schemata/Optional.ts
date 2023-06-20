/** @since 1.0.0 */
import { type Schema, make } from 'schemata-ts/Schema'
import { type ImplicitOptional, makeImplicitOptionalType } from 'schemata-ts/struct'

/**
 * A schema for widening the type of a schema to include `undefined`. Also marks the input
 * property of a struct as optional.
 *
 * @since 1.0.0
 * @category Instances
 */
export const Optional = <O, A>(
  target: Schema<O, A>,
): ImplicitOptional & Schema<O | undefined, A | undefined> =>
  makeImplicitOptionalType(make(_ => _.optional(target.runSchema(_))))
