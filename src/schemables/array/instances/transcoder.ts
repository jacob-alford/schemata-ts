import * as E from 'fp-ts/Either'
import { flow, pipe, unsafeCoerce } from 'fp-ts/function'
import * as RA from 'fp-ts/ReadonlyArray'
import * as TC from 'schemata-ts/internal/transcoder'
import { type WithArray } from 'schemata-ts/schemables/array/definition'

const validateArray = (name: string) =>
  E.fromPredicate(
    (u): u is Array<unknown> => Array.isArray(u),
    u => TC.transcodeErrors(TC.typeMismatch(name, u)),
  )

export const ArrayTranscoder: WithArray<TC.SchemableLambda> = {
  array: params => {
    const { minLength = 0, maxLength = 2 ** 32 - 2, expectedName } = params
    return item => ({
      encode: E.traverseArrayWithIndex((i, a) =>
        pipe(
          item.encode(a),
          E.mapLeft(errs => TC.transcodeErrors(TC.errorAtIndex(i, errs))),
        ),
      ),
      decode: flow(
        validateArray(expectedName),
        E.chain(u =>
          pipe(
            u,
            E.fromPredicate(
              u => u.length >= minLength && u.length <= maxLength,
              u =>
                TC.transcodeErrors(TC.typeMismatch(expectedName, `Array(${u.length})`)),
            ),
            TC.apSecond(
              pipe(
                u,
                validateArray(expectedName),
                E.chain(
                  RA.traverseWithIndex(TC.applicativeValidation)((i, u) =>
                    pipe(
                      item.decode(u),
                      E.mapLeft(errs => TC.transcodeErrors(TC.errorAtIndex(i, errs))),
                    ),
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
        RA.sequence(TC.applicativeValidation)(
          RA.zipWith(out, components, (a, encoderA) => encoderA.encode(a)),
        ),
      ),
    decode: flow(
      validateArray(name),
      E.filterOrElse(
        u => u.length === components.length,
        u => TC.transcodeErrors(TC.typeMismatch(name, u)),
      ),
      E.chain(
        RA.traverseWithIndex(TC.applicativeValidation)((i, u) =>
          pipe(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            components[i]!.decode(u),
            E.mapLeft(err => TC.transcodeErrors(TC.errorAtIndex(i, err))),
          ),
        ),
      ),
      E.map(a => unsafeCoerce(a)),
    ),
  }),
}
