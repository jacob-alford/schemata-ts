/** @since 1.4.0 */
import { type Schema, make } from 'schemata-ts/Schema'
import { type ArrayParams } from 'schemata-ts/schemables/array/definition'

/**
 * An array type of known values.
 *
 * @since 1.0.0
 * @category Combinators
 */
export const Array =
  (params?: ArrayParams) =>
  <E, A>(codomain: Schema<E, A>): Schema<ReadonlyArray<E>, ReadonlyArray<A>> =>
    make(_ => _.array(params)(codomain.runSchema(_)))
