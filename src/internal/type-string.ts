import { type Const, make } from 'fp-ts/Const'
import type * as hkt from 'schemata-ts/HKT'

/** @internal */
export type TypeString<I, O> = Const<readonly [string, string], readonly [I, O]>

/** @internal */
export const makeTypeString: <I, O>(
  ts: string | readonly [string, string],
) => TypeString<I, O> = ts => (typeof ts === 'string' ? make([ts, ts]) : make(ts))

/** @internal */
export interface SchemableLambda extends hkt.SchemableLambda {
  readonly type: TypeString<this['Input'], this['Output']>
}

/** @internal */
export const fold: (ts: readonly [string, string]) => string = ([i, o]) =>
  i !== o ? `${i} → ${o}` : i
