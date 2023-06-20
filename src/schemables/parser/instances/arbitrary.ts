import { identity } from 'fp-ts/function'
import type * as Arb from 'schemata-ts/internal/arbitrary'
import { type WithParser } from 'schemata-ts/schemables/parser/definition'

export const ParserArbitrary: WithParser<Arb.SchemableLambda> = {
  parse: () => identity,
}
