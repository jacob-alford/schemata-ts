/** @since 1.4.0 */
import { pipe } from 'fp-ts/function'
import { deriveTypeString } from 'schemata-ts/derivations/type-string-schemable'
import { type Schema, make } from 'schemata-ts/Schema'
import { ArrayTypeString } from 'schemata-ts/schemables/array/instances/type-string'

type ArrayParams = {
  readonly minLength?: number
  readonly maxLength?: number
  readonly errorName?: string
}

/**
 * An array type of known values.
 *
 * @since 1.0.0
 * @category Combinators
 */
export const Array =
  (params: ArrayParams = {}) =>
  <E, A>(codomain: Schema<E, A>): Schema<ReadonlyArray<E>, ReadonlyArray<A>> => {
    const { errorName: errorName_ } = params
    const expectedName =
      errorName_ ??
      pipe(
        deriveTypeString(codomain),
        ArrayTypeString.array({ ...params, expectedName: '' }),
      )[0]
    return make(_ =>
      _.array({
        ...params,
        expectedName,
      })(codomain.runSchema(_)),
    )
  }
