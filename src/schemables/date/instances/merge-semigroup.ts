import * as MSg from 'schemata-ts/internal/merge-semigroup'
import { type WithDate } from 'schemata-ts/schemables/date/definition'

export const DateMergeSemigroup: WithDate<MSg.SchemableLambda> = {
  date: MSg.concrete,
  dateFromString: MSg.concrete,
}
