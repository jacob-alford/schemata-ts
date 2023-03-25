import { pipe } from 'fp-ts/function'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import * as DE from 'schemata-ts/DecodeError'
import * as D from 'schemata-ts/internal/Decoder'
import {
  ordGuardedPrecedentedUnionMember,
  WithGuardedUnion,
} from 'schemata-ts/schemables/WithGuardedUnion/definition'

/** @since 2.0.0 */
export const Decoder: WithGuardedUnion<D.SchemableLambda> = {
  guardedUnion: (name, ...members) => {
    const sortedMembers = pipe(members, RNEA.sort(ordGuardedPrecedentedUnionMember))
    return {
      decode: u => {
        for (const m of sortedMembers) {
          const { guard, member } = m
          if (guard.is(u)) {
            return member.decode(u)
          }
        }
        return pipe(
          sortedMembers,
          RNEA.mapWithIndex(i =>
            D.errorAtUnionMember(i, D.decodeErrors(D.typeMismatch(name, u))),
          ),
          errs =>
            D.decodeErrors(
              ...(errs as [DE.DecodeError, ...ReadonlyArray<DE.DecodeError>]),
            ),
          D.failure,
        )
      },
    }
  },
}
