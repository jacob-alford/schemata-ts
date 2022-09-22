import * as Enc from 'io-ts/Encoder'
import { Schemable2 } from './Schemable2'

export { URI } from 'io-ts/Encoder'

export const Schemable: Schemable2<Enc.URI> = {
  URI: Enc.URI,
  literal: () => Enc.id(),
  string: Enc.id(),
  number: Enc.id(),
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
