import * as Eq from 'schemata-ts/internal/eq'
import { WithPattern } from 'schemata-ts/schemables/pattern/definition'
import { PrimitivesEq } from 'schemata-ts/schemables/primitives/instances/eq'

export const PatternEq: WithPattern<Eq.SchemableLambda> = {
  pattern: () => PrimitivesEq.string(),
}
