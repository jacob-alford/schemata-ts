/**
 * Schemable for widening a type to include undefined. Similar to nullable but for undefined.
 *
 * @since 1.0.0
 */
import * as E from 'fp-ts/Either'
import { flow, pipe, unsafeCoerce } from 'fp-ts/function'
import * as RA from 'fp-ts/ReadonlyArray'
import * as DE from 'schemata-ts/DecodeError'
import * as D from 'schemata-ts/Decoder'
import { WithArray } from 'schemata-ts/schemables/WithArray/definition'

const validateArray = E.fromPredicate(
  (u): u is Array<unknown> => Array.isArray(u),
  u => D.decodeErrors(D.typeMismatch('array', u)),
)

const applicativeValidation = E.getApplicativeValidation(DE.Semigroup)

/**
 * @since 1.0.0
 * @category Instances
 */
export const Decoder: WithArray<D.SchemableLambda> = {
  array: item => ({
    decode: flow(
      validateArray,
      E.chain(
        RA.traverseWithIndex(applicativeValidation)((i, u) =>
          pipe(
            item.decode(u),
            E.mapLeft(errs => D.decodeErrors(D.errorAtIndex(i, errs))),
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
        u => D.decodeErrors(D.typeMismatch(`tuple of length ${components.length}`, u)),
      ),
      E.chain(
        RA.traverseWithIndex(applicativeValidation)((i, u) =>
          pipe(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            components[i]!.decode(u),
            E.mapLeft(err => D.decodeErrors(D.errorAtIndex(i, err))),
          ),
        ),
      ),
      E.map(a => unsafeCoerce(a)),
    ),
  }),
}
