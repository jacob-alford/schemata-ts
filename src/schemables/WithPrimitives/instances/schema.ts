/**
 * Integer branded newtype. Parameters: min, max are inclusive.
 *
 * Represents integers:
 *
 * ```math
 *  { z | z ∈ ℤ, z >= -2 ** 53 + 1, z <= 2 ** 53 - 1 }
 * ```
 *
 * @since 1.0.0
 */
import { URI as SchemaURI } from 'schemata-ts/Schema'
import * as SC from 'schemata-ts/Schema'
import { WithInt } from 'schemata-ts/schemables/WithInt/definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Schema: WithInt<Schem.SchemableLambda>['int'] = params =>
  SC.make(S => S.int(params))
