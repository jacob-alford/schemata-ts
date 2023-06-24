import { pipe } from 'fp-ts/function'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import * as MSg from 'schemata-ts/internal/merge-semigroup'
import { type OutputOfSchemable } from 'schemata-ts/internal/schemable'
import {
  type GuardedPrecedentedUnionMember,
  type WithGuardedUnion,
  ordGuardedPrecedentedUnionMember,
} from 'schemata-ts/schemables/guarded-union/definition'

export const GuardedUnionMergeSemigroup: WithGuardedUnion<MSg.SchemableLambda> = {
  guardedUnion: <
    T extends RNEA.ReadonlyNonEmptyArray<
      GuardedPrecedentedUnionMember<MSg.SchemableLambda>
    >,
  >(
    _: string,
    ...members: T
  ): MSg.MergeSemigroup<OutputOfSchemable<MSg.SchemableLambda, T[number]['member']>> => {
    const sortedMembers = pipe(members, RNEA.sort(ordGuardedPrecedentedUnionMember))
    return MSg.makeMergeSemigroup(concrete => (x, y) => {
      for (const { member, guard } of sortedMembers) {
        if (guard.is(x) && guard.is(y)) {
          return member.semigroup(concrete).concat(x, y)
        }
      }
      return concrete.concat(x, y)
    })
  },
}
