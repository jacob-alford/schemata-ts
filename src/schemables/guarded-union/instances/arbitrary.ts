import * as fc from 'fast-check'
import { pipe } from 'fp-ts/function'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import type * as Arb from 'schemata-ts/internal/arbitrary'
import {
  type WithGuardedUnion,
  ordGuardedPrecedentedUnionMember,
} from 'schemata-ts/schemables/guarded-union/definition'

export const GuardedUnionArbitrary: WithGuardedUnion<Arb.SchemableLambda> = {
  guardedUnion: (_name, ...members) => {
    const sortedMembers = pipe(members, RNEA.sort(ordGuardedPrecedentedUnionMember))
    return fc.oneof(...sortedMembers.map(m => m.member))
  },
}
