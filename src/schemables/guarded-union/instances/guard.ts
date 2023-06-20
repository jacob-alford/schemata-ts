import { pipe } from 'fp-ts/function'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import { type OutputOf } from 'schemata-ts/HKT'
import type * as G from 'schemata-ts/internal/guard'
import {
  type GuardedPrecedentedUnionMember,
  type WithGuardedUnion,
  ordGuardedPrecedentedUnionMember,
} from 'schemata-ts/schemables/guarded-union/definition'

export const GuardedUnionGuard: WithGuardedUnion<G.SchemableLambda> = {
  guardedUnion: <
    T extends RNEA.ReadonlyNonEmptyArray<
      GuardedPrecedentedUnionMember<G.SchemableLambda>
    >,
  >(
    _: string,
    ...members: T
  ): G.Guard<OutputOf<G.SchemableLambda, T[number]['member']>> => {
    const sortedMembers = pipe(members, RNEA.sort(ordGuardedPrecedentedUnionMember))
    return {
      is: (u): u is OutputOf<G.SchemableLambda, T[number]['member']> => {
        for (const m of sortedMembers) {
          const { guard } = m
          if (guard.is(u)) {
            return true
          }
        }
        return false
      },
    }
  },
}
