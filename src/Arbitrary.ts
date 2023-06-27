/**
 * An instance of `Schemable` for `fast-check` arbitraries that emit valid values
 *
 * @since 1.0.0
 */
import type * as fc from 'fast-check'

// ------------------
// combinators
// ------------------

export {
  /**
   * Interprets a schema as a decoder
   *
   * @since 2.0.0
   * @category Interpreters
   */
  getArbitrary,
} from 'schemata-ts/derivations/arbitrary-schemable'

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @since 1.0.0
 * @category Instances
 */
export const URI = 'Arbitrary'

/**
 * @since 1.0.0
 * @category Instances
 */
export type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
  interface URItoKind<A> {
    readonly Arbitrary: fc.Arbitrary<A>
  }
}
