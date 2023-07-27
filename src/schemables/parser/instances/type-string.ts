import { type SchemableLambda, makeTypeString } from 'schemata-ts/internal/type-string'
import { type WithParser } from 'schemata-ts/schemables/parser/definition'

export const ParserTypeString: WithParser<SchemableLambda> = {
  parse:
    oldName =>
    ([, o]) =>
      makeTypeString([oldName, o]),
}
