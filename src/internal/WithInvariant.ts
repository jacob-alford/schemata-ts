import { HKT2, Kind, Kind2, URIS, URIS2 } from 'fp-ts/HKT'
import * as G from './GuardBase'

/**
 * @since 1.0.0
 * @internal
 */
export interface WithInvariantHKT2<S> {
  readonly imap: <B>(
    guardB: G.Guard<unknown, B>,
    nameB: string
  ) => <A>(f: (a: A) => B, g: (b: B) => A) => <O>(target: HKT2<S, O, A>) => HKT2<S, O, B>
}

/**
 * @since 1.0.0
 * @internal
 */
export interface WithInvariant1<S extends URIS> {
  readonly imap: <B>(
    guardB: G.Guard<unknown, B>,
    nameB: string
  ) => <A>(f: (a: A) => B, g: (b: B) => A) => (target: Kind<S, A>) => Kind<S, B>
}

/**
 * @since 1.0.0
 * @internal
 */
export interface WithInvariant2<S extends URIS2> {
  readonly imap: <B>(
    guardB: G.Guard<unknown, B>,
    nameB: string
  ) => <A>(
    f: (a: A) => B,
    g: (b: B) => A
  ) => <O>(target: Kind2<S, O, A>) => Kind2<S, O, B>
}

/**
 * @since 1.0.0
 * @internal
 */
export interface WithInvariant2C<S extends URIS2, E> {
  readonly imap: <B>(
    guardB: G.Guard<unknown, B>,
    nameB: string
  ) => <A>(f: (a: A) => B, g: (b: B) => A) => (target: Kind2<S, E, A>) => Kind2<S, E, B>
}
