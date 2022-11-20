/**
 * Re-export of `WithRefine` from `io-ts/Schemable/WithRefine`
 *
 * @since 1.0.0
 */
import * as SC from '../../../SchemaExt'
import { URI as SchemaURI } from '../../../base/SchemaBase'
import { WithRefine2 } from '../definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Schema: WithRefine2<SchemaURI>['refine'] = (refinement, id) => from =>
  SC.make(_ => _.refine(refinement, id)(from(_)))
