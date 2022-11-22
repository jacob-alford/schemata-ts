/**
 * Schemable for widening a type to include undefined. Similar to nullable but for undefined.
 *
 * @since 1.0.0
 */
import * as SC from '../../../SchemaExt'
import { URI as SchemaURI } from '../../../base/SchemaBase'
import { WithOptional2 } from '../definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Schema: WithOptional2<SchemaURI>['optional'] = <O, A>(
  target: SC.SchemaExt<O, A>,
): SC.SchemaExt<O | undefined, A | undefined> => SC.make(_ => _.optional(target(_)))
