/**
 * Invariant mapping for schemable
 *
 * @since 1.0.0
 */
import * as SC from '../../../SchemaExt'
import { URI as SchemaURI } from '../../../base/SchemaBase'
import { WithInvariant2 } from '../definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Schema: WithInvariant2<SchemaURI>['imap'] =
  (guardB, name) => (get, reverseGet) => target =>
    SC.make(S => S.imap(guardB, name)(get, reverseGet)(target(S)))
