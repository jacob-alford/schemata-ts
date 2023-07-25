/**
 * FastCheck Arbitrary's derivable from Schemata-ts schemas. Arbitrary's can even generate
 * `pattern` schema thanks to Kuvio.
 *
 * Arbitrary's require an additional method call `arbitrary` which prevents runtime errors
 * when fast-check isn't present.
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
   * Derive a fast-check arbitrary from a schemata-ts schema
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
