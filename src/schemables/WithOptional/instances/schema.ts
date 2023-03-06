/**
 * Schemable for widening a type to include undefined. Similar to nullable but for undefined.
 *
 * @since 1.0.0
 */
import { URI as SchemaURI } from 'schemata-ts/Schema'
import * as SC from 'schemata-ts/Schema'
import { WithOptional } from 'schemata-ts/schemables/WithOptional/definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Schema: WithOptional<Schem.SchemableLambda>['optional'] = <O, A>(
  target: SC.Schema<O, A>,
): SC.Schema<O | undefined, A | undefined> => SC.make(_ => _.optional(target(_)))
