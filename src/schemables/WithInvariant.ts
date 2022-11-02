/**
 * Invariant mapping for schemable
 *
 * @since 1.0.0
 */
import { Kind, Kind2, URIS, URIS2, HKT2 } from 'fp-ts/HKT'
import * as D from '../internal/DecoderBase'
import * as Enc from '../internal/EncoderBase'
import * as Eq_ from '../internal/EqBase'
import * as E from 'fp-ts/Either'
import * as G from '../internal/GuardBase'
import * as TD from '../internal/TaskDecoderBase'
import * as TE from 'fp-ts/TaskEither'
import * as t from '../internal/TypeBase'
import { URI as SchemaURI } from '../internal/SchemaBase'
import * as SC from '../SchemaExt'
import { Type as Type_ } from 'io-ts'
import * as Arb from '../internal/ArbitraryBase'
import { flow, pipe } from 'fp-ts/function'

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
    name: string
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
    name: string
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
    name: string
  ) => <A>(
    f: (a: A) => B,
    g: (b: B) => A
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
    name: string
  ) => <A>(f: (a: A) => B, g: (b: B) => A) => (target: Kind2<S, E, A>) => Kind2<S, E, B>
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Arbitrary: WithInvariant1<Arb.URI> = {
  imap: () => get => arb => arb.map(get),
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Decoder: WithInvariant2C<D.URI, unknown> = {
  imap: () => get => dA => ({
    decode: flow(dA.decode, E.map(get)),
  }),
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Encoder: WithInvariant2<Enc.URI> = {
  imap: () => (_, reverseGet) => encA => ({
    encode: flow(reverseGet, encA.encode),
  }),
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Eq: WithInvariant1<Eq_.URI> = {
  imap: () => (_, reverseGet) => eqA => ({
    equals: (x, y) => eqA.equals(reverseGet(x), reverseGet(y)),
  }),
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Guard: WithInvariant1<G.URI> = {
  imap: gB => () => () => gB,
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const TaskDecoder: WithInvariant2C<TD.URI, unknown> = {
  imap: () => get => tdA => ({
    decode: flow(tdA.decode, TE.map(get)),
  }),
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Type: WithInvariant1<t.URI> = {
  imap: (gB, name) => (get, reverseGet) => tdA =>
    new Type_(
      name,
      gB.is,
      (i, c) => pipe(tdA.validate(i, c), E.map(get)),
      flow(reverseGet, tdA.encode)
    ),
}

/**
 * @since 1.0.0
 * @category Combinators
 */
export const Schema: WithInvariant2<SchemaURI>['imap'] =
  (guardB, name) => (get, reverseGet) => target =>
    SC.make(S => S.imap(guardB, name)(get, reverseGet)(target(S)))
