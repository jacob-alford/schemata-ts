import { identity } from 'fp-ts/function'
import * as G from 'schemata-ts/internal/guard'
import { WithParser } from 'schemata-ts/schemables/parser/definition'

export const ParserGuard: WithParser<G.SchemableLambda> = {
  parse: () => identity,
}
