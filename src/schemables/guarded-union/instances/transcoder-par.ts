import { flow, pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as RA from 'fp-ts/ReadonlyArray'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import * as TE from 'fp-ts/TaskEither'
import * as TC from 'schemata-ts/internal/transcoder'
import * as TCP from 'schemata-ts/internal/transcoder-par'
import {
  type WithGuardedUnion,
  ordGuardedPrecedentedUnionMember,
} from 'schemata-ts/schemables/guarded-union/definition'
import type * as TCE from 'schemata-ts/TranscodeError'

export const GuardedUnionTranscoderPar: WithGuardedUnion<TCP.SchemableLambda> = {
  guardedUnion: (...members) => {
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
          RNEA.mapWithIndex((i, { name }) =>
            TCP.errorAtUnionMember(i, TC.transcodeErrors(TCP.typeMismatch(name, out))),
          ),
          errs =>
            TC.transcodeErrors(
              ...(errs as [TCE.TranscodeError, ...ReadonlyArray<TCE.TranscodeError>]),
            ),
          TCP.failure,
        )
      },
      decode: u =>
        pipe(
          sortedMembers,
          RA.wither(TE.ApplicativePar)(({ member }) =>
            pipe(
              member.decode(u),
              TE.map(O.some),
              TE.orElseW(() => TE.right(O.none)),
            ),
          ),
          TE.chain(
            flow(
              RNEA.fromReadonlyArray,
              O.fold(
                () =>
                  pipe(
                    sortedMembers,
                    RNEA.mapWithIndex((i, { name }) =>
                      TC.errorAtUnionMember(
                        i,
                        TC.transcodeErrors(TC.typeMismatch(name, u)),
                      ),
                    ),
                    errs =>
                      TC.transcodeErrors(
                        ...(errs as [
                          TCE.TranscodeError,
                          ...ReadonlyArray<TCE.TranscodeError>,
                        ]),
                      ),
                    TCP.failure,
                  ),
                flow(RNEA.head, TCP.success),
              ),
            ),
          ),
        ),
    }
  },
}
