/** @since 1.4.0 */
import { pipe } from 'fp-ts/function'
import { getTypeString } from 'schemata-ts/derivations/type-string-schemable'
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
    const errorName =
      errorName_ ??
      pipe(
        getTypeString(codomain),
        ArrayTypeString.array({ ...params, errorName: '' }),
      )[0]
    return make(_ =>
      _.array({
        ...params,
        errorName,
      })(codomain.runSchema(_)),
    )
  }
