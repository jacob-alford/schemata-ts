/**
 * Re-export of `WithRefine` from `io-ts/Schemable/WithRefine`
 *
 * @since 1.0.0
 */
import { URI as SchemaURI } from 'schemata-ts/Schema'
import * as SC from 'schemata-ts/Schema'
import { WithRefine2 } from 'schemata-ts/schemables/WithRefine/definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Schema: WithRefine2<SchemaURI>['refine'] = (refinement, id) => from =>
  SC.make(_ => _.refine(refinement, id)(from(_)))
