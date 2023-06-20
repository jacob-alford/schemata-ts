import { type Lazy as LazyArg } from 'fp-ts/function'
import { type Schema, make } from 'schemata-ts/Schema'

/**
 * A lazy schema is a schema for mutual recursive types.
 *
 * **Note: deriving mutually recursive arbitraries is not currently supported**
 *
 * @since 1.0.0
 */
export const Lazy = <I, O>(name: string, f: LazyArg<Schema<I, O>>): Schema<I, O> =>
  make(_ => _.lazy(name, () => f().runSchema(_)))
