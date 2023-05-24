/**
 * A port of `newtype-ts` to schemata-ts
 *
 * @since 1.4.0
 */

import { unsafeCoerce } from 'fp-ts/function'
import { Iso, make } from 'schemata-ts/iso'

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
export interface NewtypeIso<A, B> extends Iso<A, B> {
  readonly wrap: (A: A) => B
  readonly unwrap: (B: B) => A
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
  ...make(unsafeCoerce, unsafeCoerce),
  wrap: unsafeCoerce,
  unwrap: unsafeCoerce,
})

/**
 * @since 1.4.0
 * @category Constructors
 */
export const wrap: <Nt extends Newtype<any, any>>() => (a: CarrierOf<Nt>) => Nt = () =>
  unsafeCoerce

/**
 * @since 1.4.0
 * @category Destructors
 */
export const unwrap: <Nt extends Newtype<any, any>>() => (a: Nt) => CarrierOf<Nt> = () =>
  unsafeCoerce
