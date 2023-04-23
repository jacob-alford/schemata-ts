import * as Eq_ from 'schemata-ts/Eq'
import { WithPattern } from 'schemata-ts/schemables/pattern/definition'
import { PrimitivesEq } from 'schemata-ts/schemables/primitives/instances/eq'

export const PatternEq: WithPattern<Eq_.SchemableLambda> = {
  pattern: () => PrimitivesEq.string(),
}
