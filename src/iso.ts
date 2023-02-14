/**
 * A port of `monocle-ts` experimental `Iso` to schemata-ts
 *
 * @since 1.4.0
 */
import { Category2 } from 'fp-ts/Category'
import { flow, identity } from 'fp-ts/function'
import { Invariant2 } from 'fp-ts/Invariant'
import { Semigroupoid2 } from 'fp-ts/Semigroupoid'

/**
 * Represents an isomorphism between two types.
 *
 * @since 1.4.0
 * @category Models
 */
export interface Iso<A, B> {
  readonly get: (a: A) => B
  readonly reverseGet: (b: B) => A
}

/**
 * @since 1.4.0
 * @category Constructors
 */
export const make: <A, B>(get: (a: A) => B, reverseGet: (b: B) => A) => Iso<A, B> = (
  get,
  reverseGet,
) => ({
  get,
  reverseGet,
})

// Non-pipeables
const imap_: <S, A, B>(iso: Iso<S, A>, f: (a: A) => B, g: (b: B) => A) => Iso<S, B> = (
  iso,
  f,
  g,
) => ({
  get: flow(iso.get, f),
  reverseGet: flow(g, iso.reverseGet),
})
const compose_: <A, B, C>(bc: Iso<B, C>, ab: Iso<A, B>) => Iso<A, C> = (bc, ab) => ({
  get: flow(ab.get, bc.get),
  reverseGet: flow(bc.reverseGet, ab.reverseGet),
})

/**
 * @since 1.4.0
 * @category Instance Methods
 */
export const imap: <A, B>(
  f: (a: A) => B,
  g: (b: B) => A,
) => <S>(iso: Iso<S, A>) => Iso<S, B> = (f, g) => iso => imap_(iso, f, g)

/**
 * @since 1.4.0
 * @category Instance Methods
 */
export const compose: <B, C>(ab: Iso<B, C>) => <A>(iso: Iso<A, B>) => Iso<A, C> =
  bc => ab =>
    compose_(bc, ab)

/**
 * @since 1.4.0
 * @category Instance Methods
 */
export const id: <A>() => Iso<A, A> = () => ({
  get: identity,
  reverseGet: identity,
})

/**
 * @since 1.4.0
 * @category Instances
 */
export const URI = 'schemata-ts/Iso'

/**
 * @since 1.4.0
 * @category Instances
 */
export type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: Iso<E, A>
  }
}

/**
 * @since 1.4.0
 * @category Instances
 */
export const Invariant: Invariant2<URI> = {
  URI,
  imap: imap_,
}

/**
 * @since 1.4.0
 * @category Instances
 */
export const Semigroupoid: Semigroupoid2<URI> = {
  URI,
  compose: compose_,
}

/**
 * @since 1.4.0
 * @category Instances
 */
export const Category: Category2<URI> = {
  ...Semigroupoid,
  id,
}
