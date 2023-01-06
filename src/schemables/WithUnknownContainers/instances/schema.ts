/**
 * Re-export of `WithUnknownContainers` from `io-ts/Schemable/WithUnknownContainers`
 *
 * @since 1.0.0
 */
import { URI as SchemaURI } from 'schemata-ts/base/SchemaBase'
import { WithUnknownContainers2 } from 'schemata-ts/schemables/WithUnknownContainers/definition'
import * as SC from 'schemata-ts/SchemaExt'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Schema: WithUnknownContainers2<SchemaURI> = {
  UnknownArray: SC.make(_ => _.UnknownArray),
  UnknownRecord: SC.make(_ => _.UnknownRecord),
}
