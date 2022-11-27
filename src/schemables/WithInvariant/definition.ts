/**
 * Invariant mapping for schemable
 *
 * @since 1.0.0
 */
import { HKT2, Kind, Kind2, URIS, URIS2 } from 'fp-ts/HKT'

import * as G from '../../base/GuardBase'

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithInvariantHKT2<S> {
  /**
   * Invariant mapping for schemable
   *
   * @since 1.0.0
   */
  readonly imap: <B>(
    guardB: G.Guard<unknown, B>,
    name: string,
  ) => <A>(f: (a: A) => B, g: (b: B) => A) => <O>(target: HKT2<S, O, A>) => HKT2<S, O, B>
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithInvariant1<S extends URIS> {
  /**
   * Invariant mapping for schemable
   *
   * @since 1.0.0
   */
  readonly imap: <B>(
    guardB: G.Guard<unknown, B>,
    name: string,
  ) => <A>(f: (a: A) => B, g: (b: B) => A) => (target: Kind<S, A>) => Kind<S, B>
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithInvariant2<S extends URIS2> {
  /**
   * Invariant mapping for schemable
   *
   * @since 1.0.0
   */
  readonly imap: <B>(
    guardB: G.Guard<unknown, B>,
    name: string,
  ) => <A>(
    f: (a: A) => B,
    g: (b: B) => A,
  ) => <O>(target: Kind2<S, O, A>) => Kind2<S, O, B>
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithInvariant2C<S extends URIS2, E> {
  /**
   * Invariant mapping for schemable
   *
   * @since 1.0.0
   */
  readonly imap: <B>(
    guardB: G.Guard<unknown, B>,
    name: string,
  ) => <A>(f: (a: A) => B, g: (b: B) => A) => (target: Kind2<S, E, A>) => Kind2<S, E, B>
}
