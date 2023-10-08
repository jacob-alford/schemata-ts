/** @since 1.0.0 */
import { make } from 'schemata-ts/internal/schema'
import { type Schema } from 'schemata-ts/Schema'

/**
 * An intersection of two struct-derived types.
 *
 * @deprecated Use `Struct({}).intersect()` instead.
 * @since 1.0.0
 * @category Combinators
 */
export const Intersect = <
  I1 extends Record<string, any>,
  I2 extends Record<string, any>,
  O1 extends Record<string, any>,
  O2 extends Record<string, any>,
>(
  x: Schema<I1, O1>,
  y: Schema<I2, O2>,
): Schema<I1 & I2, O1 & O2> => make(_ => _.intersection(x.runSchema(_), y.runSchema(_)))
