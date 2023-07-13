/** @since 1.4.0 */
import { pipe, unsafeCoerce } from 'fp-ts/function'
import * as RA from 'fp-ts/ReadonlyArray'
import { getTypeString } from 'schemata-ts/derivations/type-string-schemable'
import { type InputOf, type OutputOf, type Schema, make } from 'schemata-ts/Schema'
import { ArrayTypeString } from 'schemata-ts/schemables/array/instances/type-string'

/**
 * A schema for n-tuples
 *
 * @since 1.0.0
 * @category Combinators
 */
export const Tuple = <T extends ReadonlyArray<Schema<any, any>>>(
  ...items: T
): Schema<
  {
    readonly [K in keyof T]: InputOf<T[K]>
  },
  {
    readonly [K in keyof T]: OutputOf<T[K]>
  }
> => {
  const name = ArrayTypeString.tuple('', ...items.map(getTypeString))[0]
  return unsafeCoerce(
    make(S =>
      pipe(
        items,
        RA.map(schema => schema.runSchema(S)),
        schemable => S.tuple(name, ...schemable),
      ),
    ),
  )
}
