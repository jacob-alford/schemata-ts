/**
 * Printer instance for WithUnknown
 *
 * @since 1.3.0
 */
import { URI as SchemaURI } from 'schemata-ts/base/SchemaBase'
import { WithUnknown2 } from 'schemata-ts/schemables/WithUnknown/definition'
import * as SC from 'schemata-ts/SchemaExt'

/**
 * @since 1.3.0
 * @category Instances
 */
export const Schema: WithUnknown2<SchemaURI>['unknown'] = SC.make(_ => _.unknown)
