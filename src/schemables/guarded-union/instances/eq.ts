import { pipe } from 'fp-ts/function'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import * as Eq from 'schemata-ts/internal/eq'
import {
  ordGuardedPrecedentedUnionMember,
  WithGuardedUnion,
} from 'schemata-ts/schemables/guarded-union/definition'

export const GuardedUnionEq: WithGuardedUnion<Eq.SchemableLambda> = {
  guardedUnion: (_name, ...members) => {
    const sortedMembers = pipe(members, RNEA.sort(ordGuardedPrecedentedUnionMember))
    return {
      equals: (x, y) => {
        for (const m of sortedMembers) {
          const { member, guard } = m
          if (guard.is(x) && guard.is(y)) {
            return member.equals(x, y)
          }
        }
        return false
      },
    }
  },
}
