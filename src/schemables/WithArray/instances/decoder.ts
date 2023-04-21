import * as E from 'fp-ts/Either'
import { flow, pipe, unsafeCoerce } from 'fp-ts/function'
import * as RA from 'fp-ts/ReadonlyArray'
import * as TC from 'schemata-ts/internal/Transcoder'
import { WithArray } from 'schemata-ts/schemables/WithArray/definition'
import * as TCE from 'schemata-ts/TranscodeError'

const validateArray = E.fromPredicate(
  (u): u is Array<unknown> => Array.isArray(u),
  u => TC.decodeErrors(TC.typeMismatch('array', u)),
)

const applicativeValidation = E.getApplicativeValidation(TCE.Semigroup)

export const WithArrayTranscoder: WithArray<TC.SchemableLambda> = {
  array: item => ({
    decode: flow(
      validateArray,
      E.chain(
        RA.traverseWithIndex(applicativeValidation)((i, u) =>
          pipe(
            item.decode(u),
            E.mapLeft(errs => TC.decodeErrors(TC.errorAtIndex(i, errs))),
          ),
        ),
      ),
    ),
  }),
  tuple: (...components) => ({
    decode: flow(
      validateArray,
      E.filterOrElse(
        u => u.length === components.length,
        u => TC.decodeErrors(TC.typeMismatch(`tuple of length ${components.length}`, u)),
      ),
      E.chain(
        RA.traverseWithIndex(applicativeValidation)((i, u) =>
          pipe(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            components[i]!.decode(u),
            E.mapLeft(err => TC.decodeErrors(TC.errorAtIndex(i, err))),
          ),
        ),
      ),
      E.map(a => unsafeCoerce(a)),
    ),
  }),
}
