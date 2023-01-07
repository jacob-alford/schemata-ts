/**
 * Schemable for widening a type to include undefined. Similar to nullable but for undefined.
 *
 * @since 1.0.0
 */
import { URI as SchemaURI } from 'schemata-ts/base/SchemaBase'
import { WithOptional2 } from 'schemata-ts/schemables/WithOptional/definition'
import * as SC from 'schemata-ts/SchemaExt'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Schema: WithOptional2<SchemaURI>['optional'] = <O, A>(
  target: SC.SchemaExt<O, A>,
): SC.SchemaExt<O | undefined, A | undefined> => SC.make(_ => _.optional(target(_)))
