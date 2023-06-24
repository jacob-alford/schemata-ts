import * as MSg from 'schemata-ts/internal/merge-semigroup'
import { type WithPattern } from 'schemata-ts/schemables/pattern/definition'

export const PatternMergeSemigroup: WithPattern<MSg.SchemableLambda> = {
  pattern: MSg.concrete,
}
