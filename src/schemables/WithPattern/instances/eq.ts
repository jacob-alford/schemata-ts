import * as Eq_ from 'schemata-ts/Eq'
import { WithPattern } from 'schemata-ts/schemables/WithPattern/definition'
import { Eq as P } from 'schemata-ts/schemables/WithPrimitives/instances/eq'

export const WithPatternEq: WithPattern<Eq_.SchemableLambda> = {
  pattern: () => P.string(),
}
