import { flow, pipe, unsafeCoerce } from 'fp-ts/function'
import * as RA from 'fp-ts/ReadonlyArray'
import * as T from 'fp-ts/Task'
import * as TE from 'fp-ts/TaskEither'
import * as TCE from 'schemata-ts/TranscodeError'
import * as TC from 'schemata-ts/internal/Transcoder'
import * as PD from 'schemata-ts/internal/parallel-decoder'
import { WithArray } from 'schemata-ts/schemables/WithArray/definition'

const validateArray = TE.fromPredicate(
  (u): u is Array<unknown> => Array.isArray(u),
  u => TC.decodeErrors(TC.typeMismatch('array', u)),
)

const applicativeValidation = TE.getApplicativeTaskValidation(
  T.ApplicativePar,
  TCE.Semigroup,
)

export const WithArrayParallelDecoder: WithArray<PD.SchemableLambda> = {
  array: item => ({
    decode: flow(
      validateArray,
      TE.chain(
        RA.traverseWithIndex(applicativeValidation)((i, u) =>
          pipe(
            item.decode(u),
            TE.mapLeft(errs => TC.decodeErrors(TC.errorAtIndex(i, errs))),
          ),
        ),
      ),
    ),
  }),
  tuple: (...components) => ({
    decode: flow(
      validateArray,
      TE.filterOrElse(
        u => u.length === components.length,
        u => TC.decodeErrors(TC.typeMismatch(`tuple of length ${components.length}`, u)),
      ),
      TE.chain(
        RA.traverseWithIndex(applicativeValidation)((i, u) =>
          pipe(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            components[i]!.decode(u),
            TE.mapLeft(err => TC.decodeErrors(TC.errorAtIndex(i, err))),
          ),
        ),
      ),
      TE.map(a => unsafeCoerce(a)),
    ),
  }),
}
