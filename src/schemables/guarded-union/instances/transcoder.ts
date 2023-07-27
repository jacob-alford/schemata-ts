import { altAll } from 'fp-ts/Alt'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import * as RA from 'fp-ts/ReadonlyArray'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import * as TC from 'schemata-ts/internal/transcoder'
import {
  type WithGuardedUnion,
  ordGuardedPrecedentedUnionMember,
} from 'schemata-ts/schemables/guarded-union/definition'
import * as TCE from 'schemata-ts/TranscodeError'

const altValidation = E.getAltValidation(TCE.Semigroup)

export const GuardedUnionTranscoder: WithGuardedUnion<TC.SchemableLambda> = {
  guardedUnion: (...members) => {
    const sortedMembers = pipe(members, RNEA.sort(ordGuardedPrecedentedUnionMember))
    const firstMember = RNEA.head(sortedMembers)
    const tailMembers = RNEA.tail(sortedMembers)
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
          RNEA.map(({ name }) =>
            TC.errorAtUnionMember(name, TC.transcodeErrors(TC.typeMismatch(name, out))),
          ),
          errs =>
            TC.transcodeErrors(
              ...(errs as [TCE.TranscodeError, ...ReadonlyArray<TCE.TranscodeError>]),
            ),
          TC.failure,
        )
      },
      decode: u =>
        pipe(
          tailMembers,
          RA.map(_ =>
            pipe(
              _.member.decode(u),
              E.mapLeft(errors =>
                TC.transcodeErrors(TC.errorAtUnionMember(_.name, errors)),
              ),
            ),
          ),
          altAll(altValidation)(
            pipe(
              firstMember.member.decode(u),
              E.mapLeft(errors =>
                sortedMembers.length > 1
                  ? TC.transcodeErrors(TC.errorAtUnionMember(firstMember.name, errors))
                  : errors,
              ),
            ),
          ),
        ),
    }
  },
}
