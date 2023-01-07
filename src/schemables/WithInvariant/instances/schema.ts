/**
 * Invariant mapping for schemable
 *
 * @since 1.0.0
 */
import { URI as SchemaURI } from 'schemata-ts/base/SchemaBase'
import { WithInvariant2 } from 'schemata-ts/schemables/WithInvariant/definition'
import * as SC from 'schemata-ts/SchemaExt'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Schema: WithInvariant2<SchemaURI>['imap'] =
  (guardB, name) => (get, reverseGet) => target =>
    SC.make(S => S.imap(guardB, name)(get, reverseGet)(target(S)))
