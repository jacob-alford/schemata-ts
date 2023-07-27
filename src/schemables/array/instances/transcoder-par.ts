import { flow, pipe, unsafeCoerce } from 'fp-ts/function'
import * as RA from 'fp-ts/ReadonlyArray'
import * as TE from 'fp-ts/TaskEither'
import * as TC from 'schemata-ts/internal/transcoder'
import * as TCP from 'schemata-ts/internal/transcoder-par'
import { type WithArray } from 'schemata-ts/schemables/array/definition'

const validateArray = (name: string) =>
  TE.fromPredicate(
    (u): u is Array<unknown> => Array.isArray(u),
    u => TC.transcodeErrors(TC.typeMismatch(name, u)),
  )

export const ArrayTranscoderPar: WithArray<TCP.SchemableLambda> = {
  array: params => {
    const { minLength = 0, maxLength = 2 ** 32 - 2, expectedName } = params

    return item => ({
      encode: RA.traverseWithIndex(TCP.applicativeValidationPar)((i, u) =>
        pipe(
          item.encode(u),
          TE.mapLeft(errs => TC.transcodeErrors(TC.errorAtIndex(i, errs))),
        ),
      ),
      decode: flow(
        validateArray(expectedName),
        TE.chain(u =>
          pipe(
            u,
            TE.fromPredicate(
              u => u.length >= minLength && u.length <= maxLength,
              u =>
                TC.transcodeErrors(TC.typeMismatch(expectedName, `Array(${u.length})`)),
            ),
            TCP.apSecond(
              pipe(
                u,
                RA.traverseWithIndex(TCP.applicativeValidationPar)((i, u) =>
                  pipe(
                    item.decode(u),
                    TE.mapLeft(errs => TC.transcodeErrors(TC.errorAtIndex(i, errs))),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    })
  },
  tuple: (name, ...components) => ({
    encode: out =>
      unsafeCoerce(
        RA.sequence(TCP.applicativeValidationPar)(
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
        RA.traverseWithIndex(TCP.applicativeValidationPar)((i, u) =>
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
