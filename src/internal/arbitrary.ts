import type * as FastCheck from 'fast-check'
import type * as hkt from 'schemata-ts/internal/schemable'
import { memoize } from 'schemata-ts/Schema'

export interface Arbitrary<A> {
  readonly arbitrary: (fc: typeof FastCheck) => FastCheck.Arbitrary<A>
}

/** @internal */
export const makeArbitrary = <A>(
  arbitrary: (fc: typeof FastCheck) => FastCheck.Arbitrary<A>,
): Arbitrary<A> => ({
  arbitrary: memoize(arbitrary),
})

/** @since 1.0.0 */
export const URI = 'Arbitrary'

/** @since 1.0.0 */
export type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
  interface URItoKind<A> {
    readonly Arbitrary: Arbitrary<A>
  }
}

/** @since 2.0.0 */
export interface SchemableLambda extends hkt.SchemableLambda {
  readonly type: Arbitrary<this['Output']>
}
