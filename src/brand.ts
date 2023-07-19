import { type Opaque } from 'type-fest'

/**
 * A newtype that's assignable to its underlying type.
 *
 * @since 1.4.0
 * @category Model
 */
export type Branded<A, B> = Opaque<A, B>
