/** @since 1.4.0 */
import { type Schema, make } from 'schemata-ts/Schema'

/**
 * A Typescript Record type with string-keys and known values.
 *
 * @since 1.0.0
 * @category Combinators
 */
export const Record = <K extends string, E, A>(
  keys: Schema<K, K>,
  codomain: Schema<E, A>,
): Schema<Readonly<Record<K, E>>, Readonly<Record<K, A>>> =>
  make(_ => _.record(keys.runSchema(_), codomain.runSchema(_)))
