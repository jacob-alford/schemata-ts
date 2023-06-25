import { constant } from 'fp-ts/function'
import * as MSg from 'schemata-ts/internal/merge-semigroup'
import { type WithDate } from 'schemata-ts/schemables/date/definition'

export const DateMergeSemigroup: WithDate<MSg.SchemableLambda> = {
  date: constant(MSg.identity()),
  dateFromString: constant(MSg.identity()),
}
