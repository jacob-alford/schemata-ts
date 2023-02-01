/**
 * Represents a ReadonlyMap converted from an expected array of entries.
 *
 * @since 1.0.0
 */
import * as E from 'fp-ts/Either'
import { Type as Type_ } from 'io-ts'
import * as t from 'io-ts/Type'
import { WithStructM1 } from 'schemata-ts/schemables/WithStructM/definition'
import { Encoder } from 'schemata-ts/schemables/WithStructM/instances/encoder'
import { Guard } from 'schemata-ts/schemables/WithStructM/instances/guard'

/**
 * @deprecated
 * @since 1.0.0
 * @category Instances
 */
export const Type: WithStructM1<t.URI> = {
  structM: (makeProperties, params) =>
    new Type_(
      `mappedStruct`,
      Guard.structM(makeProperties, params).is,
      i =>
        E.left([{ value: i, context: [], message: 'Type not implemented for StructM' }]),
      Encoder.structM(makeProperties, params).encode,
    ),
}
