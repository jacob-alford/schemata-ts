/**
 * Schemable for constructing a branded newtype
 *
 * @since 1.0.0
 */
import * as G from '../../../base/GuardBase'
import { WithBrand1 } from '../definition'
import { identity } from 'fp-ts/function'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Guard: WithBrand1<G.URI> = {
  // @ts-expect-error -- Branding is only type change, implicit cast here
  brand: () => identity,
}
