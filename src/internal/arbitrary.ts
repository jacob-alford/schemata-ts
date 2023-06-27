import type * as fc from 'fast-check'
import type * as hkt from 'schemata-ts/internal/schemable'

/** @since 1.0.0 */
export const URI = 'Arbitrary'

/** @since 1.0.0 */
export type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
  interface URItoKind<A> {
    readonly Arbitrary: fc.Arbitrary<A>
  }
}

/** @since 2.0.0 */
export interface SchemableLambda extends hkt.SchemableLambda {
  readonly type: fc.Arbitrary<this['Output']>
}
