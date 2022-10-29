import { HKT2, Kind, Kind2, URIS, URIS2 } from 'fp-ts/HKT'

/**
 * This internal structure is compatible with `Iso` from `monocle-ts`.
 *
 * @since 1.0.0
 * @internal
 */
type Iso<A, B> = {
  get: (s: A) => B
  reverseGet: (b: B) => A
}

/**
 * @since 1.0.0
 * @internal
 */
export interface WithIsoHKT2<S> {
  readonly iso: <A, B>(iso: Iso<A, B>) => <O>(target: HKT2<S, O, A>) => HKT2<S, O, B>
}

/**
 * @since 1.0.0
 * @internal
 */
export interface WithIso1<S extends URIS> {
  readonly iso: <A, B>(iso: Iso<A, B>) => (target: Kind<S, A>) => Kind<S, B>
}

/**
 * @since 1.0.0
 * @internal
 */
export interface WithIso2<S extends URIS2> {
  readonly iso: <A, B>(iso: Iso<A, B>) => <O>(target: Kind2<S, O, A>) => Kind2<S, O, B>
}

/**
 * @since 1.0.0
 * @internal
 */
export interface WithIso2C<S extends URIS2, E> {
  readonly iso: <A, B>(iso: Iso<A, B>) => (target: Kind2<S, E, A>) => Kind2<S, E, B>
}
