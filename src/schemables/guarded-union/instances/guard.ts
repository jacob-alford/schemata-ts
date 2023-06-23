import { pipe } from 'fp-ts/function'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import type * as G from 'schemata-ts/internal/guard'
import { type OutputOfSchemable } from 'schemata-ts/internal/schemable'
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
  ): G.Guard<OutputOfSchemable<G.SchemableLambda, T[number]['member']>> => {
    const sortedMembers = pipe(members, RNEA.sort(ordGuardedPrecedentedUnionMember))
    return {
      is: (u): u is OutputOfSchemable<G.SchemableLambda, T[number]['member']> => {
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
