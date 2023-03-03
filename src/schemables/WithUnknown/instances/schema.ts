/**
 * Printer instance for WithUnknown
 *
 * @since 1.3.0
 */
import { URI as SchemaURI } from 'schemata-ts/Schema'
import * as SC from 'schemata-ts/Schema'
import { WithUnknown2 } from 'schemata-ts/schemables/WithUnknown/definition'

/**
 * @since 1.3.0
 * @category Instances
 */
export const Schema: WithUnknown2<SchemaURI>['unknown'] = SC.make(_ => _.unknown)
