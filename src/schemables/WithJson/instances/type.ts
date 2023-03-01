/**
 * A basal schemable for Json and JsonString
 *
 * @since 1.1.0
 */
import { failure, success, Type as Type_ } from 'io-ts'
import * as t from 'schemata-ts/Type'
import { WithJson1 } from 'schemata-ts/schemables/WithJson/definition'
import { Encoder } from 'schemata-ts/schemables/WithJson/instances/encoder'
import { Guard } from 'schemata-ts/schemables/WithJson/instances/guard'

/**
 * @deprecated
 * @since 1.1.0
 * @category Instances
 */
export const Type: WithJson1<t.URI> = {
  json: new Type_(
    'Json',
    Guard.json.is,
    u => (Guard.json.is(u) ? success(u) : failure(u, [], 'Json')),
    Encoder.json.encode,
  ),
  jsonString: new Type_(
    'JsonString',
    Guard.jsonString.is,
    u => (Guard.jsonString.is(u) ? success(u) : failure(u, [], 'JsonString')),
    Encoder.jsonString.encode,
  ),
}
