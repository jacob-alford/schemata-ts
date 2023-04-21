import { pipe } from 'fp-ts/function'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import * as Arb from 'schemata-ts/internal/arbitrary'
import {
  ordGuardedPrecedentedUnionMember,
  WithGuardedUnion,
} from 'schemata-ts/schemables/WithGuardedUnion/definition'

export const WithGuardedUnionArbitrary: WithGuardedUnion<Arb.SchemableLambda> = {
  guardedUnion: (_name, ...members) => {
    const sortedMembers = pipe(members, RNEA.sort(ordGuardedPrecedentedUnionMember))
    return {
      arbitrary: fc => fc.oneof(...sortedMembers.map(m => m.member.arbitrary(fc))),
    }
  },
}
