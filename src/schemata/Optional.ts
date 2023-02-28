/**
 * Schemable for widening a type to include undefined. Similar to nullable but for undefined.
 *
 * @since 1.0.0
 */
import * as SC from 'schemata-ts/Schema'
import { ImplicitOptional, makeImplicitOptional } from 'schemata-ts/struct'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Optional = <O, A>(
  target: SC.Schema<O, A>,
): ImplicitOptional & SC.Schema<O | undefined, A | undefined> =>
  makeImplicitOptional(
    SC.make(_ => _.optional(target(_))),
    schema => schema.bind({}),
  )
