import { Lazy as LazyArg } from 'fp-ts/function'
import { make, memoize, Schema } from 'schemata-ts/Schema'

/**
 * A lazy schema is a schema for mutual recursive types
 *
 * @since 1.0.0
 */
export const Lazy = <I, O>(f: LazyArg<Schema<I, O>>): Schema<I, O> => {
  const get = memoize<void, Schema<I, O>>(f)
  return make(_ => _.lazy(() => get()(_)))
}
