import { identity } from 'fp-ts/function'
import type * as MSg from 'schemata-ts/internal/merge-semigroup'
import { type WithParser } from 'schemata-ts/schemables/parser/definition'

export const ParserMergeSemigroup: WithParser<MSg.SchemableLambda> = {
  parse: () => identity,
}
