import { identity } from 'fp-ts/function'
import type * as Eq from 'schemata-ts/internal/eq'
import { type WithParser } from 'schemata-ts/schemables/parser/definition'

export const ParserEq: WithParser<Eq.SchemableLambda> = {
  parse: () => identity,
}
