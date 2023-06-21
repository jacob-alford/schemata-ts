import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import * as TC from 'schemata-ts/internal/transcoder'
import {
  type WithGuardedUnion,
  ordGuardedPrecedentedUnionMember,
} from 'schemata-ts/schemables/guarded-union/definition'
import type * as TCE from 'schemata-ts/TranscodeError'

export const GuardedUnionTranscoder: WithGuardedUnion<TC.SchemableLambda> = {
  guardedUnion: (name, ...members) => {
    const sortedMembers = pipe(members, RNEA.sort(ordGuardedPrecedentedUnionMember))
    return {
      encode: out => {
        for (const m of sortedMembers) {
          const { guard, member } = m
          if (guard.is(out)) {
            return member.encode(out)
          }
        }
        return pipe(
          sortedMembers,
          RNEA.mapWithIndex(i =>
            TC.errorAtUnionMember(i, TC.transcodeErrors(TC.typeMismatch(name, out))),
          ),
          errs =>
            TC.transcodeErrors(
              ...(errs as [TCE.TranscodeError, ...ReadonlyArray<TCE.TranscodeError>]),
            ),
          TC.failure,
        )
      },
      decode: u => {
        for (const m of sortedMembers) {
          const { member } = m
          const result = member.decode(u)
          if (E.isRight(result)) {
            return result
          }
        }

        return pipe(
          sortedMembers,
          RNEA.mapWithIndex(i =>
            TC.errorAtUnionMember(i, TC.transcodeErrors(TC.typeMismatch(name, u))),
          ),
          errs =>
            TC.transcodeErrors(
              ...(errs as [TCE.TranscodeError, ...ReadonlyArray<TCE.TranscodeError>]),
            ),
          TC.failure,
        )
      },
    }
  },
}
