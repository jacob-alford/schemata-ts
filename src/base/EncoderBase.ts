/**
 * An instance of `Schemable` for io-ts/Encoder
 *
 * @since 1.0.0
 */
import * as Enc from 'io-ts/Encoder'
import { Schemable2 } from './SchemableBase'

export * from 'io-ts/Encoder'

/**
 * An instance of `Schemable` for io-ts/Encoder
 *
 * @since 1.0.0
 * @category Instances
 */
export const Schemable: Schemable2<Enc.URI> = {
  URI: Enc.URI,
  literal: () => Enc.id(),
  string: Enc.id(),
  number: Enc.id(),
  boolean: Enc.id(),
  nullable: Enc.nullable,
  // @ts-expect-error -- typelevel difference
  struct: Enc.struct,
  // @ts-expect-error -- typelevel difference
  partial: Enc.partial,
  record: Enc.record,
  array: Enc.array,
  // @ts-expect-error -- typelevel difference
  tuple: Enc.tuple,
  intersect: Enc.intersect,
  // @ts-expect-error -- typelevel difference
  sum: Enc.sum,
  lazy: (_id, f) => Enc.lazy(f),
  readonly: Enc.readonly,
}
