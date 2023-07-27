import { constant } from 'fp-ts/function'
import * as MSg from 'schemata-ts/internal/merge-semigroup'
import { type WithGuardedUnion } from 'schemata-ts/schemables/guarded-union/definition'

export const GuardedUnionMergeSemigroup: WithGuardedUnion<MSg.SchemableLambda> = {
  guardedUnion: constant(MSg.identity('fallback')),
}
