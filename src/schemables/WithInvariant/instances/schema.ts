import * as SC from 'schemata-ts/Schema'
import { WithInvariant } from 'schemata-ts/schemables/WithInvariant/definition'

export const WithInvariantSchema: WithInvariant<Schem.SchemableLambda>['imap'] =
  (guardB, name) => (get, reverseGet) => target =>
    SC.make(S => S.imap(guardB, name)(get, reverseGet)(target(S)))
