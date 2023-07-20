/**
 * Input / output type strings for a schema
 *
 * @since 2.0.0
 */

import { type Const } from 'fp-ts/Const'

// ------------------
// models
// ------------------

/**
 * Input / Output type strings for a schema
 *
 * @since 2.0.0
 * @category Model
 */
export type TypeString<I, O> = Const<readonly [string, string], readonly [I, O]>

// ------------------
// constructors
// ------------------

export {
  /**
   * Interprets a schema as a type string
   *
   * @since 2.0.0
   * @category Interpreters
   */
  deriveTypeString,
} from 'schemata-ts/derivations/type-string-schemable'

// ------------------
// instances
// ------------------

/**
 * @since 2.0.0
 * @category Instances
 */
export const URI = 'schemata-ts/TypeString'

/**
 * @since 2.0.0
 * @category Instances
 */
export type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: TypeString<E, A>
  }
}
