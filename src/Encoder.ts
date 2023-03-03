/**
 * Represents a typeclass and data type for encoding values that are the transformed
 * output of decoder to its expected input
 *
 * @since 2.0.0
 */

/**
 * Represents a typeclass and data type for encoding values that are the transformed
 * output of decoder to its expected input
 *
 * @since 2.0.0
 * @category Model
 */
export interface Encoder<I, O> {
  readonly encode: (a: I) => O
}

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
