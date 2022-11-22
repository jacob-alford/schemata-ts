/**
 * Schemable for widening a type to include undefined. Similar to nullable but for undefined.
 *
 * @since 1.0.0
 */
import * as Eq_ from 'fp-ts/Eq'
import { WithOptional1 } from '../definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Eq: WithOptional1<Eq_.URI> = {
  optional: eqA => ({
    equals: (x, y) =>
      x === undefined ? y === undefined : y !== undefined && eqA.equals(x, y),
  }),
}
