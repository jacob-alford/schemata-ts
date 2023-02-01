/**
 * Schemable for constructing a branded newtype
 *
 * @since 1.0.0
 */
import { identity } from 'fp-ts/function'
import * as t from 'schemata-ts/base/TypeBase'
import { WithBrand1 } from 'schemata-ts/schemables/WithBrand/definition'

/**
 * @deprecated
 * @since 1.0.0
 * @category Instances
 */
export const Type: WithBrand1<t.URI> = {
  // @ts-expect-error -- Branding is only type change, implicit cast here
  brand: () => identity,
}
