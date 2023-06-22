import {
  type SchemableLambda,
  fold,
  makeTypeString,
} from 'schemata-ts/internal/type-string'
import { type WithParser } from 'schemata-ts/schemables/parser/definition'

export const ParserTypeString: WithParser<SchemableLambda> = {
  parse:
    oldName =>
    ([i, o]) =>
      makeTypeString([fold(makeTypeString([oldName, i])), o]),
}
