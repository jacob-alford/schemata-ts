/**
 * Re-export of `WithRefine` from `io-ts/Schemable/WithRefine`
 *
 * @since 1.0.0
 */
import { URI as SchemaURI } from 'schemata-ts/base/SchemaBase'
import { WithRefine2 } from 'schemata-ts/schemables/WithRefine/definition'
import * as SC from 'schemata-ts/SchemaExt'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Schema: WithRefine2<SchemaURI>['refine'] = (refinement, id) => from =>
  SC.make(_ => _.refine(refinement, id)(from(_)))
