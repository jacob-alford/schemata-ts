import type * as G from 'schemata-ts/internal/guard'
import { type WithPattern } from 'schemata-ts/schemables/pattern/definition'
import { pattern } from 'schemata-ts/schemables/pattern/utils'

export const PatternGuard: WithPattern<G.SchemableLambda> = {
  pattern: (p, _, caseSensitive) => pattern(p, caseSensitive),
}
