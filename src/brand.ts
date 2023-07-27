/**
 * A branded newtype is a newtype that's assignable to its underlying type; using the type
 * system to restrict usage of a weaker type where an enforced structure is required.
 *
 * Branded types are used for nearly all schemata-ts's string types.
 *
 * @since 1.4.0
 */
import { type Opaque } from 'type-fest'

/**
 * A newtype that's assignable to its underlying type.
 *
 * @since 1.4.0
 * @category Model
 */
export type Branded<A, B> = Opaque<A, B>
