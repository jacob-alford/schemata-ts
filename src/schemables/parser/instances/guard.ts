import { identity } from 'fp-ts/function'
import type * as G from 'schemata-ts/internal/guard'
import { type WithParser } from 'schemata-ts/schemables/parser/definition'

export const ParserGuard: WithParser<G.SchemableLambda> = {
  parse: () => identity,
}
