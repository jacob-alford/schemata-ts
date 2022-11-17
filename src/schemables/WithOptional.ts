/**
 * Schemable for widening a type to include undefined. Similar to nullable but for undefined.
 *
 * @since 1.0.0
 */
import { Kind, Kind2, URIS, URIS2, HKT2 } from 'fp-ts/HKT'
import * as D from '../base/DecoderBase'
import * as Enc from '../base/EncoderBase'
import * as Eq_ from 'fp-ts/Eq'
import * as G from '../base/GuardBase'
import * as TD from '../base/TaskDecoderBase'
import * as t from '../base/TypeBase'
import * as Arb from '../base/ArbitraryBase'
import * as fc from 'fast-check'
import * as SC from '../SchemaExt'
import { URI as SchemaURI } from '../base/SchemaBase'
import * as t_ from 'io-ts'

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithOptionalHKT2<S> {
  /**
   * Schemable for widening a type to include undefined. Similar to nullable but for undefined.
   *
   * @since 1.0.0
   */
  readonly optional: <O, A>(
    target: HKT2<S, O, A>,
  ) => HKT2<S, O | undefined, A | undefined>
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithOptional1<S extends URIS> {
  /**
   * Schemable for widening a type to include undefined. Similar to nullable but for undefined.
   *
   * @since 1.0.0
   */
  readonly optional: <A>(target: Kind<S, A>) => Kind<S, A | undefined>
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithOptional2<S extends URIS2> {
  /**
   * Schemable for widening a type to include undefined. Similar to nullable but for undefined.
   *
   * @since 1.0.0
   */
  readonly optional: <O, A>(
    target: Kind2<S, O, A>,
  ) => Kind2<S, O | undefined, A | undefined>
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithOptional2C<S extends URIS2, E> {
  /**
   * Schemable for widening a type to include undefined. Similar to nullable but for undefined.
   *
   * @since 1.0.0
   */
  readonly optional: <A>(target: Kind2<S, E, A>) => Kind2<S, E, A | undefined>
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Arbitrary: WithOptional1<Arb.URI> = {
  optional: arbA => fc.oneof(arbA, fc.constant(undefined)),
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Decoder: WithOptional2C<D.URI, unknown> = {
  optional: da => ({
    decode: u => (u === undefined ? D.success(u) : da.decode(u)),
  }),
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Encoder: WithOptional2<Enc.URI> = {
  optional: ea => ({
    encode: a => (a === undefined ? undefined : ea.encode(a)),
  }),
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Eq: WithOptional1<Eq_.URI> = {
  optional: eqA => ({
    equals: (x, y) =>
      x === undefined ? y === undefined : y !== undefined && eqA.equals(x, y),
  }),
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Guard: WithOptional1<G.URI> = {
  optional: <A>(gA: G.Guard<unknown, A>): G.Guard<unknown, A | undefined> => ({
    is: (a): a is A | undefined => a === undefined || gA.is(a),
  }),
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const TaskDecoder: WithOptional2C<TD.URI, unknown> = {
  optional: tA => ({
    decode: u => (u === undefined ? TD.success(u) : tA.decode(u)),
  }),
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Type: WithOptional1<t.URI> = {
  optional: tA =>
    new t_.Type(
      `optional(${tA.name})`,
      Guard.optional(tA).is,
      u => (u === undefined ? t_.success(u) : tA.decode(u)),
      Encoder.optional(tA).encode,
    ),
}

/**
 * @since 1.0.0
 * @category Combinators
 */
export const Schema: WithOptional2<SchemaURI>['optional'] = <O, A>(
  target: SC.SchemaExt<O, A>,
): SC.SchemaExt<O | undefined, A | undefined> => SC.make(_ => _.optional(target(_)))
