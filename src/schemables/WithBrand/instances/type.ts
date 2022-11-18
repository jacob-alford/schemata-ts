/**
 * Schemable for constructing a branded newtype
 *
 * @since 1.0.0
 */
import * as t from '../../../base/TypeBase'
import { identity } from 'fp-ts/function'
import { WithBrand1 } from '../definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Type: WithBrand1<t.URI> = {
  // @ts-expect-error -- Branding is only type change, implicit cast here
  brand: () => identity,
}
