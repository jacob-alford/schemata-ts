import { identity } from 'fp-ts/function'
import * as Str from 'fp-ts/string'
import * as Eq from 'schemata-ts/internal/eq'
import { WithParser } from 'schemata-ts/schemables/parser/definition'

export const ParserEq: WithParser<Eq.SchemableLambda> = {
  parse: () => identity,
  jsonString: Str.Eq,
}
