import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { makeImplicitOptionalType } from 'schemata-ts/internal/struct'
import * as TC from 'schemata-ts/internal/transcoder'
import { type WithOptional } from 'schemata-ts/schemables/optional/definition'

export const OptionalTranscoder: WithOptional<TC.SchemableLambda> = {
  optional: (da, name) =>
    makeImplicitOptionalType({
      decode: u =>
        u === undefined
          ? TC.success(u)
          : pipe(
              da.decode(u),
              E.mapLeft(errs =>
                TC.transcodeErrors(
                  TC.errorAtUnionMember(
                    'undefined',
                    TC.transcodeErrors(TC.typeMismatch('undefined', u)),
                  ),
                  TC.errorAtUnionMember(name, errs),
                ),
              ),
            ),
      encode: a => (a === undefined ? TC.success(undefined) : da.encode(a)),
    }),
}
