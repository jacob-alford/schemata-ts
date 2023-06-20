import { constant, identity } from 'fp-ts/function'
import type * as Inf from 'schemata-ts/internal/information'
import { type WithParser } from 'schemata-ts/schemables/parser/definition'

export const ParserInformation: WithParser<Inf.SchemableLambda> = {
  parse: constant(identity),
}
