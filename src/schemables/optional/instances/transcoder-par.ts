import { pipe } from 'fp-ts/function'
import * as TE from 'fp-ts/TaskEither'
import { makeImplicitOptionalType } from 'schemata-ts/internal/struct'
import * as TC from 'schemata-ts/internal/transcoder'
import * as TCP from 'schemata-ts/internal/transcoder-par'
import { type WithOptional } from 'schemata-ts/schemables/optional/definition'

export const OptionalTranscoderPar: WithOptional<TCP.SchemableLambda> = {
  optional: (da, name) =>
    makeImplicitOptionalType({
      decode: u =>
        u === undefined
          ? TCP.success<any>(u)
          : pipe(
              da.decode(u),
              TE.mapLeft(errs =>
                TC.transcodeErrors(
                  TC.errorAtUnionMember(
                    'undefined',
                    TC.transcodeErrors(TC.typeMismatch('undefined', u)),
                  ),
                  TC.errorAtUnionMember(name, errs),
                ),
              ),
            ),
      encode: a => (a === undefined ? TCP.success(undefined) : da.encode(a)),
    }),
}
