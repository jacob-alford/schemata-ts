import * as G from 'schemata-ts/internal/guard'
import { WithPattern } from 'schemata-ts/schemables/pattern/definition'
import { pattern } from 'schemata-ts/schemables/pattern/utils'

export const WithPatternGuard: WithPattern<G.SchemableLambda> = {
  pattern,
}
