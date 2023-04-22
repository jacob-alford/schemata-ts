import { flow, pipe, unsafeCoerce } from 'fp-ts/function'
import * as RA from 'fp-ts/ReadonlyArray'
import * as T from 'fp-ts/Task'
import * as TE from 'fp-ts/TaskEither'
import * as TC from 'schemata-ts/internal/transcoder'
import * as TCP from 'schemata-ts/internal/transcoder-par'
import { WithArray } from 'schemata-ts/schemables/array/definition'
import * as TCE from 'schemata-ts/TranscodeError'

const validateArray = TE.fromPredicate(
  (u): u is Array<unknown> => Array.isArray(u),
  u => TC.transcodeErrors(TC.typeMismatch('array', u)),
)

const applicativeValidation = TE.getApplicativeTaskValidation(
  T.ApplicativePar,
  TCE.Semigroup,
)

export const ArrayTranscoderPar: WithArray<TCP.SchemableLambda> = {
  array: item => ({
    encode: RA.traverseWithIndex(applicativeValidation)((i, u) =>
      pipe(
        item.encode(u),
        TE.mapLeft(errs => TC.transcodeErrors(TC.errorAtIndex(i, errs))),
      ),
    ),
    decode: flow(
      validateArray,
      TE.chain(
        RA.traverseWithIndex(applicativeValidation)((i, u) =>
          pipe(
            item.decode(u),
            TE.mapLeft(errs => TC.transcodeErrors(TC.errorAtIndex(i, errs))),
          ),
        ),
      ),
    ),
  }),
  tuple: (...components) => ({
    encode: out =>
      unsafeCoerce(
        RA.sequence(applicativeValidation)(
          RA.zipWith(out, components, (a, encoderA) => encoderA.encode(a)),
        ),
      ),
    decode: flow(
      validateArray,
      TE.filterOrElse(
        u => u.length === components.length,
        u =>
          TC.transcodeErrors(TC.typeMismatch(`tuple of length ${components.length}`, u)),
      ),
      TE.chain(
        RA.traverseWithIndex(applicativeValidation)((i, u) =>
          pipe(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            components[i]!.decode(u),
            TE.mapLeft(err => TC.transcodeErrors(TC.errorAtIndex(i, err))),
          ),
        ),
      ),
      TE.map(a => unsafeCoerce(a)),
    ),
  }),
}
