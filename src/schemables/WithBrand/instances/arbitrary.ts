/**
 * Schemable for constructing a branded newtype
 *
 * @since 1.0.0
 */
import { identity } from 'fp-ts/function'
import * as Arb from '../../../base/ArbitraryBase'
import { WithBrand1 } from '../definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Arbitrary: WithBrand1<Arb.URI> = {
  // @ts-expect-error -- Branding is only type change, implicit cast here
  brand: () => identity,
}
