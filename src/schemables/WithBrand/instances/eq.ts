/**
 * Schemable for constructing a branded newtype
 *
 * @since 1.0.0
 */
import * as Eq_ from 'fp-ts/Eq'
import { WithBrand1 } from '../definition'
import { identity } from 'fp-ts/function'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Eq: WithBrand1<Eq_.URI> = {
  brand: () => identity,
}
