/**
 * A port of `io-ts` branded types to schemata-ts
 *
 * @since 1.4.0
 */
import { Brand as Brand_ } from 'io-ts'

/**
 * Represents a unique identifier to prevent non-branded types from being assigned to branded types.
 *
 * @since 1.4.0
 * @category Model
 */
export interface Brand<B> extends Brand_<B> {}

/**
 * A newtype that's assignable to its underlying type.
 *
 * @since 1.4.0
 * @category Model
 */
export type Branded<A, B> = A & Brand<B>
