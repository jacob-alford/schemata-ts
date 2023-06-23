/**
 * A schemable for determining information entropy of a schema.
 *
 * @since 2.0.0
 */
import { type Const, make } from 'fp-ts/Const'
import type * as hkt from 'schemata-ts/internal/schemable'

/** @internal */
export type Information<A> = Const<number, A>

/** @internal */
export const makeInformation: <A>(e: number) => Information<A> = e =>
  make(Math.min(e, Number.MAX_VALUE)) as any

/** @internal */
export interface SchemableLambda extends hkt.SchemableLambda {
  readonly type: Information<this['Output']>
}

/** @internal */
export const informationFromSampleSize: <A>(
  sampleSize: number,
) => Information<A> = sampleSize =>
  sampleSize <= 0 ? makeInformation(0) : makeInformation(Math.log2(sampleSize))
