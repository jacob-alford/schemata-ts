/**
 * Re-export of `WithUnknownContainers` from `io-ts/Schemable/WithUnknownContainers`
 *
 * @since 1.0.0
 */
import * as SC from '../../../SchemaExt'
import { URI as SchemaURI } from '../../../base/SchemaBase'
import { WithUnknownContainers2 } from '../definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Schema: WithUnknownContainers2<SchemaURI> = {
  UnknownArray: SC.make(_ => _.UnknownArray),
  UnknownRecord: SC.make(_ => _.UnknownRecord),
}
