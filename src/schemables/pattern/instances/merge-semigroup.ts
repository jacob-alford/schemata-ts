import { constant } from 'fp-ts/function'
import * as Sg from 'fp-ts/Semigroup'
import * as MSg from 'schemata-ts/internal/merge-semigroup'
import { type WithPattern } from 'schemata-ts/schemables/pattern/definition'

export const PatternMergeSemigroup: WithPattern<MSg.SchemableLambda> = {
  pattern: constant(
    MSg.constSemigroup(concrete => (concrete === 'first' ? Sg.first() : Sg.last())),
  ),
}
