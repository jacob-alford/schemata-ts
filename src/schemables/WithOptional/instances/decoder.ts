/**
 * Schemable for widening a type to include undefined. Similar to nullable but for undefined.
 *
 * @since 1.0.0
 */
import * as D from 'schemata-ts/Decoder'
import { WithOptional } from 'schemata-ts/schemables/WithOptional/definition'
import { makeImplicitOptional } from 'schemata-ts/struct'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Decoder: WithOptional<D.SchemableLambda> = {
  optional: da =>
    makeImplicitOptional(
      {
        decode: u => (u === undefined ? D.success<any>(u) : da.decode(u)),
      },
      decoder => Object.assign({}, decoder),
    ),
}
