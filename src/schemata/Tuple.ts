/**
 * A schema for n-tuples
 *
 * @since 1.4.0
 * @category Model
 */
import { pipe, unsafeCoerce } from 'fp-ts/function'
import * as RA from 'fp-ts/ReadonlyArray'
import { InputOf, make, OutputOf, Schema } from 'schemata-ts/Schema'

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
    [K in keyof T]: InputOf<T[K]>
  },
  {
    [K in keyof T]: OutputOf<T[K]>
  }
> =>
  unsafeCoerce(
    make(S =>
      pipe(
        items,
        RA.map(schema => schema.runSchema(S)),
        schemable => S.tuple(...schemable),
      ),
    ),
  )
