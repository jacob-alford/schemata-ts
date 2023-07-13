import { pipe } from 'fp-ts/function'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import * as Arb from 'schemata-ts/internal/arbitrary'
import {
  type WithGuardedUnion,
  ordGuardedPrecedentedUnionMember,
} from 'schemata-ts/schemables/guarded-union/definition'

export const GuardedUnionArbitrary: WithGuardedUnion<Arb.SchemableLambda> = {
  guardedUnion: (...members) => {
    const sortedMembers = pipe(members, RNEA.sort(ordGuardedPrecedentedUnionMember))
    return Arb.makeArbitrary(fc =>
      fc.oneof(...sortedMembers.map(m => m.member.arbitrary(fc))),
    )
  },
}
