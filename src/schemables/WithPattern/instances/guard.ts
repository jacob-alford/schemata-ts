import * as G from 'schemata-ts/internal/guard'
import { WithPattern } from 'schemata-ts/schemables/WithPattern/definition'
import { pattern } from 'schemata-ts/schemables/WithPattern/utils'

export const WithPatternGuard: WithPattern<G.SchemableLambda> = {
  pattern,
}
