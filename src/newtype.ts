/**
 * A port of `newtype-ts` to schemata-ts. Unliked branded types, newtypes are not
 * assignable to the underlying type.
 *
 * Schemata-ts uses Newtypes for UUIDs.
 *
 * @since 1.4.0
 */

import { unsafeCoerce } from 'fp-ts/function'

/**
 * Represents a wrapped type that's not assignable to its underlying type.
 *
 * @since 1.4.0
 * @category Models
 */
export interface Newtype<URI, A> {
  readonly _URI: URI
  readonly _A: A
}

/** @since 2.0.0 */
export interface NewtypeIso<A, B> {
  readonly wrap: (B: B) => A
  readonly unwrap: (A: A) => B
}

/**
 * @since 1.4.0
 * @category Type Helpers
 */
export type URIOf<N extends Newtype<any, any>> = N['_URI']

/**
 * @since 1.4.0
 * @category Type Helpers
 */
export type CarrierOf<N extends Newtype<any, any>> = N['_A']

/**
 * @since 1.4.0
 * @category Type Helpers
 */
export type CombineURIs<
  N1 extends Newtype<any, any>,
  N2 extends Newtype<any, CarrierOf<N1>>,
> = Newtype<URIOf<N1> & URIOf<N2>, CarrierOf<N1>>

/**
 * @since 1.4.0
 * @category Constructors
 */
export const iso: <Nt extends Newtype<any, any>>() => NewtypeIso<
  Nt,
  CarrierOf<Nt>
> = () => ({
  wrap: unsafeCoerce,
  unwrap: unsafeCoerce,
})
