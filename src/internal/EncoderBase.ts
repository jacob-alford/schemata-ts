import * as Enc from 'io-ts/Encoder'
import { Schemable2, WithRefine2, WithUnknownContainers2 } from './Schemable2'
import { WithPattern2 } from './WithPattern'

export { URI } from 'io-ts/Encoder'

export const Schemable: Schemable2<Enc.URI> & WithUnknownContainers2<Enc.URI> = {
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

export const WithUnknownContainers: WithUnknownContainers2<Enc.URI> = {
  UnknownArray: Enc.id(),
  UnknownRecord: Enc.id(),
}

export const WithPattern: WithPattern2<Enc.URI> = {
  pattern: () => Enc.id(),
}

export const WithRefine: WithRefine2<Enc.URI> = {
  // @ts-expect-error -- refinement only changes type-level information, but types don't check out here
  refine: () => Enc.id,
}
