/**
 * A Typescript Array type of similar values.
 *
 * @since 1.4.0
 * @category Model
 */
import { make, Schema } from 'schemata-ts/Schema'
import { ArrayParams } from 'schemata-ts/schemables/array/definition'

/**
 * A Typescript Record type with unknown keys and known values.
 *
 * @since 1.0.0
 * @category Combinators
 */
export const Array =
  (params?: ArrayParams) =>
  <E, A>(codomain: Schema<E, A>): Schema<Array<E>, ReadonlyArray<A>> =>
    make(_ => _.array(params)(codomain(_)))
