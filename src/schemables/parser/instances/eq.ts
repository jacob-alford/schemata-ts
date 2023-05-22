import { identity } from 'fp-ts/function'
import * as Eq from 'schemata-ts/internal/eq'
import { WithParser } from 'schemata-ts/schemables/parser/definition'

export const ParserEq: WithParser<Eq.SchemableLambda> = {
  parse: () => identity,
}
