/**
 * Schemable for widening a type to include undefined. Similar to nullable but for undefined.
 *
 * @since 1.0.0
 */
import { flow, pipe, unsafeCoerce } from 'fp-ts/function'
import * as RA from 'fp-ts/ReadonlyArray'
import * as T from 'fp-ts/Task'
import * as TE from 'fp-ts/TaskEither'
import * as DE from 'schemata-ts/DecodeError'
import * as D from 'schemata-ts/internal/Decoder'
import * as PD from 'schemata-ts/internal/ParallelDecoder'
import { WithArray } from 'schemata-ts/schemables/WithArray/definition'

const validateArray = TE.fromPredicate(
  (u): u is Array<unknown> => Array.isArray(u),
  u => D.decodeErrors(D.typeMismatch('array', u)),
)

const applicativeValidation = TE.getApplicativeTaskValidation(
  T.ApplicativePar,
  DE.Semigroup,
)

/**
 * @since 1.0.0
 * @category Instances
 */
export const ParallelDecoder: WithArray<PD.SchemableLambda> = {
  array: item => ({
    decode: flow(
      validateArray,
      TE.chain(
        RA.traverseWithIndex(applicativeValidation)((i, u) =>
          pipe(
            item.decode(u),
            TE.mapLeft(errs => D.decodeErrors(D.errorAtIndex(i, errs))),
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
        u => D.decodeErrors(D.typeMismatch(`tuple of length ${components.length}`, u)),
      ),
      TE.chain(
        RA.traverseWithIndex(applicativeValidation)((i, u) =>
          pipe(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            components[i]!.decode(u),
            TE.mapLeft(err => D.decodeErrors(D.errorAtIndex(i, err))),
          ),
        ),
      ),
      TE.map(a => unsafeCoerce(a)),
    ),
  }),
}
