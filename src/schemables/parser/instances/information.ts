import { constant, identity } from 'fp-ts/function'
import * as Inf from 'schemata-ts/internal/information'
import { WithParser } from 'schemata-ts/schemables/parser/definition'

export const ParserInformation: WithParser<Inf.SchemableLambda> = {
  parse: constant(identity),
}
