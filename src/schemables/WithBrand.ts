/**
 * Schemable for constructing a branded newtype
 *
 * @since 1.0.0
 */
import { Kind, Kind2, URIS, URIS2, HKT2 } from 'fp-ts/HKT'
import * as D from '../internal/DecoderBase'
import * as Enc from '../internal/EncoderBase'
import * as Eq_ from 'fp-ts/Eq'
import * as G from '../internal/GuardBase'
import * as TD from '../internal/TaskDecoderBase'
import * as t from '../internal/TypeBase'
import * as Arb from '../internal/ArbitraryBase'
import * as SC from '../SchemaExt'
import { identity } from 'fp-ts/function'
import { Brand } from 'io-ts'

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithBrandHKT2<S> {
  /**
   * Schemable for constructing a branded newtype
   *
   * @since 1.0.0
   */
  readonly brand: <B extends Brand<symbol>>() => <O, A>(
    target: HKT2<S, O, A>
  ) => HKT2<S, O, A & B>
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithBrand1<S extends URIS> {
  /**
   * Schemable for constructing a branded newtype
   *
   * @since 1.0.0
   */
  readonly brand: <B extends Brand<symbol>>() => <A>(target: Kind<S, A>) => Kind<S, A & B>
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithBrand2<S extends URIS2> {
  /**
   * Schemable for constructing a branded newtype
   *
   * @since 1.0.0
   */
  readonly brand: <B extends Brand<symbol>>() => <O, A>(
    target: Kind2<S, O, A>
  ) => Kind2<S, O, A & B>
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithBrand2C<S extends URIS2, E> {
  /**
   * Schemable for constructing a branded newtype
   *
   * @since 1.0.0
   */
  readonly brand: <B extends Brand<symbol>>() => <A>(
    target: Kind2<S, E, A>
  ) => Kind2<S, E, A & B>
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Arbitrary: WithBrand1<Arb.URI> = {
  // @ts-expect-error -- Branding is only type change, implicit cast here
  brand: () => identity,
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Decoder: WithBrand2C<D.URI, unknown> = {
  // @ts-expect-error -- Branding is only type change, implicit cast here
  brand: () => identity,
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Encoder: WithBrand2<Enc.URI> = {
  brand: () => identity,
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Eq: WithBrand1<Eq_.URI> = {
  brand: () => identity,
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Guard: WithBrand1<G.URI> = {
  // @ts-expect-error -- Branding is only type change, implicit cast here
  brand: () => identity,
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const TaskDecoder: WithBrand2C<TD.URI, unknown> = {
  // @ts-expect-error -- Branding is only type change, implicit cast here
  brand: () => identity,
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Type: WithBrand1<t.URI> = {
  // @ts-expect-error -- Branding is only type change, implicit cast here
  brand: () => identity,
}

/**
 * @since 1.0.0
 * @category Combinators
 */
export const Schema =
  <B extends Brand<symbol>>() =>
  <O, A>(target: SC.SchemaExt<O, A>): SC.SchemaExt<O, A & B> =>
    SC.make(_ => _.brand<B>()<O, A>(target(_)))
