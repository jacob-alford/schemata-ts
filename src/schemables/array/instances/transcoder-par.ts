import { flow, pipe, unsafeCoerce } from 'fp-ts/function'
import * as RA from 'fp-ts/ReadonlyArray'
import * as T from 'fp-ts/Task'
import * as TE from 'fp-ts/TaskEither'
import * as TC from 'schemata-ts/internal/transcoder'
import type * as TCP from 'schemata-ts/internal/transcoder-par'
import { type WithArray } from 'schemata-ts/schemables/array/definition'
import * as TCE from 'schemata-ts/TranscodeError'

const validateArray = (name: string) =>
  TE.fromPredicate(
    (u): u is Array<unknown> => Array.isArray(u),
    u => TC.transcodeErrors(TC.typeMismatch(name, u)),
  )

const applicativeValidation = TE.getApplicativeTaskValidation(
  T.ApplicativePar,
  TCE.Semigroup,
)

export const ArrayTranscoderPar: WithArray<TCP.SchemableLambda> = {
  array: (params = {}) => {
    const { minLength = 0, maxLength = 2 ** 32 - 2, expectedName } = params

    return item => ({
      encode: RA.traverseWithIndex(applicativeValidation)((i, u) =>
        pipe(
          item.encode(u),
          TE.mapLeft(errs => TC.transcodeErrors(TC.errorAtIndex(i, errs))),
        ),
      ),
      decode: flow(
        validateArray(expectedName ?? 'Array'),
        TE.filterOrElse(
          u => u.length >= minLength && u.length <= maxLength,
          u =>
            TC.transcodeErrors(
              TC.typeMismatch(expectedName ?? `Array[${minLength},${maxLength}]`, u),
            ),
        ),
        TE.chain(
          RA.traverseWithIndex(applicativeValidation)((i, u) =>
            pipe(
              item.decode(u),
              TE.mapLeft(errs => TC.transcodeErrors(TC.errorAtIndex(i, errs))),
            ),
          ),
        ),
      ),
    })
  },
  tuple: (name, ...components) => ({
    encode: out =>
      unsafeCoerce(
        RA.sequence(applicativeValidation)(
          RA.zipWith(out, components, (a, encoderA) => encoderA.encode(a)),
        ),
      ),
    decode: flow(
      validateArray(name),
      TE.filterOrElse(
        u => u.length === components.length,
        u => TC.transcodeErrors(TC.typeMismatch(name, u)),
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
