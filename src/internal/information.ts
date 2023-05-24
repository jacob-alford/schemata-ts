/**
 * A schemable for determining information entropy of a schema.
 *
 * @since 2.0.0
 */
import { Const, make } from 'fp-ts/Const'
import * as hkt from 'schemata-ts/HKT'

/** @internal */
export type Information<A> = Const<number, A>

/** @internal */
export const makeInformation: <A>(e: unknown) => Information<A> = make as any

/** @internal */
export interface SchemableLambda extends hkt.SchemableLambda {
  readonly type: Information<this['Output']>
}

/** @internal */
export const informationFromSampleSize: <A>(
  sampleSize: number,
) => Information<A> = sampleSize => makeInformation(Math.log2(sampleSize))
