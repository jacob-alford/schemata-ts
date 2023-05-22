import { identity } from 'fp-ts/function'
import * as Arb from 'schemata-ts/internal/arbitrary'
import { WithParser } from 'schemata-ts/schemables/parser/definition'

export const ParserArbitrary: WithParser<Arb.SchemableLambda> = {
  parse: () => identity,
}
