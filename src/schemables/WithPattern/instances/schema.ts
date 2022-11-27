/**
 * Schemable construction based on Regex combinators
 *
 * @since 1.0.0
 */
import { URI as SchemaURI } from '../../../base/SchemaBase'
import * as SC from '../../../SchemaExt'
import { WithPattern2 } from '../definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Schema: WithPattern2<SchemaURI>['pattern'] = (pattern, description) =>
  SC.make(S => S.pattern(pattern, description))
