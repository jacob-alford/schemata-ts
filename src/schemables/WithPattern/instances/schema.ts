/**
 * Schemable construction based on Regex combinators
 *
 * @since 1.0.0
 */
import { URI as SchemaURI } from 'schemata-ts/base/SchemaBase'
import { WithPattern2 } from 'schemata-ts/schemables/WithPattern/definition'
import * as SC from 'schemata-ts/SchemaExt'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Schema: WithPattern2<SchemaURI>['pattern'] = (pattern, description) =>
  SC.make(S => S.pattern(pattern, description))
