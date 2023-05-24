/**
 * Schemata-ts branded types
 *
 * @since 1.4.0
 */

/** @since 2.0.0 */
export const BrandSymbol = Symbol.for('schemata-ts/brand')
export type BrandSymbol = typeof BrandSymbol

/**
 * Represents a unique identifier to prevent non-branded types from being assigned to branded types.
 *
 * @since 1.4.0
 * @category Model
 */
export interface Brand<B> {
  readonly [BrandSymbol]: B
}

/**
 * A newtype that's assignable to its underlying type.
 *
 * @since 1.4.0
 * @category Model
 */
export type Branded<A, B> = A & Brand<B>
