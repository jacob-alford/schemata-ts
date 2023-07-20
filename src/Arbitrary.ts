/**
 * An instance of `Schemable` for `fast-check` arbitraries that emit valid values
 *
 * @since 1.0.0
 */
import type * as FastCheck from 'fast-check'

/**
 * @since 1.0.0
 * @category Model
 */
export interface Arbitrary<A> {
  readonly arbitrary: (fc: typeof FastCheck) => FastCheck.Arbitrary<A>
}

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
  deriveArbitrary,
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
    readonly Arbitrary: Arbitrary<A>
  }
}
