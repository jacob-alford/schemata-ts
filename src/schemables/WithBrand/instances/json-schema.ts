/**
 * Schemable for constructing a branded newtype
 *
 * @since 1.2.0
 */
import { identity } from 'fp-ts/function'
import * as JS from 'schemata-ts/base/JsonSchemaBase'
import { WithBrand2 } from 'schemata-ts/schemables/WithBrand/definition'

/**
 * @since 1.2.0
 * @category Instances
 */
export const JsonSchema: WithBrand2<JS.URI> = {
  brand: () => identity,
}
