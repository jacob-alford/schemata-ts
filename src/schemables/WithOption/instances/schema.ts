/**
 * Represents an exclusion of a supplied value where the exclusion is mapped to `None`.
 * Requires an inner schemable, and an Eq instance which defaults to strict equality.
 *
 * @since 1.0.0
 */
import { URI as SchemaURI } from '../../../base/SchemaBase'
import * as SC from '../../../SchemaExt'
import { WithOption2 } from '../definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Schema: WithOption2<SchemaURI>['optionFromExclude'] = (
  exclude,
  schemaA,
  eq,
) => SC.make(S => S.optionFromExclude(exclude, schemaA(S), eq))
