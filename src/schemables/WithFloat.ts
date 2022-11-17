/**
 * Floating point branded newtype. Parameters: min, max are inclusive.
 *
 * Represents floating point numbers:
 *
 * ```math
 *  { f | f ∈ ℝ, f >= -Number.MAX_VALUE, f <= Number.MAX_VALUE }
 * ```
 *
 * @since 1.0.0
 */
import { Kind, Kind2, URIS, URIS2, HKT2 } from 'fp-ts/HKT'
import * as Enc from 'io-ts/Encoder'
import * as D from 'io-ts/Decoder'
import * as Eq_ from 'fp-ts/Eq'
import * as G from 'io-ts/Guard'
import * as TD from 'io-ts/TaskDecoder'
import * as t from 'io-ts/Type'
import * as N from 'fp-ts/number'
import { pipe } from 'fp-ts/function'
import * as fc from 'fast-check'
import * as SC from '../SchemaExt'
import { URI as SchemaURI } from '../base/SchemaBase'
import * as Arb from '../base/ArbitraryBase'
import { Branded } from 'io-ts'

/**
 * @since 1.0.0
 * @internal
 */
interface FloatBrand {
  readonly Float: unique symbol
}

/**
 * Floating point branded newtype. Parameters: min, max are inclusive.
 *
 * Represents floating point numbers:
 *
 * ```math
 *  { f | f ∈ ℝ, f >= -Number.MAX_VALUE, f <= Number.MAX_VALUE }
 * ```
 *
 * @since 1.0.0
 * @category Model
 */
export type Float = Branded<number, FloatBrand>

/**
 * @since 1.0.0
 * @category Model
 */
export type FloatParams = {
  readonly min?: number
  readonly max?: number
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithFloatHKT2<S> {
  /**
   * Floating point branded newtype. Parameters: min, max are inclusive.
   *
   * Represents floating point numbers:
   *
   * ```math
   *  { f | f ∈ ℝ, f >= -Number.MAX_VALUE, f <= Number.MAX_VALUE }
   * ```
   *
   * @since 1.0.0
   */
  float: (params?: FloatParams) => HKT2<S, number, Float>
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithFloat1<S extends URIS> {
  /**
   * Floating point branded newtype. Parameters: min, max are inclusive.
   *
   * Represents floating point numbers:
   *
   * ```math
   *  { f | f ∈ ℝ, f >= -Number.MAX_VALUE, f <= Number.MAX_VALUE }
   * ```
   *
   * @since 1.0.0
   */
  float: (params?: FloatParams) => Kind<S, Float>
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithFloat2<S extends URIS2> {
  /**
   * Floating point branded newtype. Parameters: min, max are inclusive.
   *
   * Represents floating point numbers:
   *
   * ```math
   *  { f | f ∈ ℝ, f >= -Number.MAX_VALUE, f <= Number.MAX_VALUE }
   * ```
   *
   * @since 1.0.0
   */
  float: (params?: FloatParams) => Kind2<S, number, Float>
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithFloat2C<S extends URIS2, E> {
  /**
   * Floating point branded newtype. Parameters: min, max are inclusive.
   *
   * Represents floating point numbers:
   *
   * ```math
   *  { f | f ∈ ℝ, f >= -Number.MAX_VALUE, f <= Number.MAX_VALUE }
   * ```
   *
   * @since 1.0.0
   */
  float: (params?: FloatParams) => Kind2<S, E, Float>
}

/**
 * @since 1.0.0
 * @category Refinements
 */
export const isFloat =
  ({ min = -Number.MAX_VALUE, max = Number.MAX_VALUE }: FloatParams = {}) =>
  (n: number): n is Float =>
    typeof n === 'number' && !Number.isNaN(n) && n >= min && n <= max

/**
 * @since 1.0.0
 * @category Instances
 */
export const Decoder: WithFloat2C<D.URI, unknown> = {
  float: params => pipe(D.number, D.refine(isFloat(params), 'float')),
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Eq: WithFloat1<Eq_.URI> = { float: () => N.Eq }

/**
 * @since 1.0.0
 * @category Instances
 */
export const Guard: WithFloat1<G.URI> = {
  float: params => pipe(G.number, G.refine(isFloat(params))),
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const TaskDecoder: WithFloat2C<TD.URI, unknown> = {
  float: params => pipe(TD.number, TD.refine(isFloat(params), 'float')),
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Type: WithFloat1<t.URI> = {
  float: params => pipe(t.number, t.refine(isFloat(params), 'float')),
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Encoder: WithFloat2<Enc.URI> = { float: () => Enc.id() }

/**
 * @since 1.0.0
 * @category Instances
 */
export const Arbitrary: WithFloat1<Arb.URI> = {
  float(params = {}) {
    const { min = -Number.MAX_VALUE, max = Number.MAX_VALUE } = params
    return fc
      .double({
        min,
        max,
        noDefaultInfinity: true,
        noNaN: true,
      })
      .filter(isFloat(params))
  },
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Schema: WithFloat2<SchemaURI> = {
  float: params => SC.make(S => S.float(params)),
}
