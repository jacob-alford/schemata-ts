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
import { URI as SchemaURI } from '../internal/SchemaBase'
import * as Arb from '../internal/ArbitraryBase'

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
export type Float = number & FloatBrand

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
export type SchemableParams<S> = (params?: FloatParams) => HKT2<S, number, Float>

/**
 * @since 1.0.0
 * @category Model
 */
export type SchemableParams1<S extends URIS> = (params?: FloatParams) => Kind<S, Float>

/**
 * @since 1.0.0
 * @category Model
 */
export type SchemableParams2<S extends URIS2> = (
  params?: FloatParams,
) => Kind2<S, number, Float>

/**
 * @since 1.0.0
 * @category Model
 */
export type SchemableParams2C<S extends URIS2> = (
  params?: FloatParams,
) => Kind2<S, unknown, Float>

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
export const Decoder: SchemableParams2C<D.URI> = params =>
  pipe(D.number, D.refine(isFloat(params), 'float'))

/**
 * @since 1.0.0
 * @category Instances
 */
export const Eq: SchemableParams1<Eq_.URI> = () => N.Eq

/**
 * @since 1.0.0
 * @category Instances
 */
export const Guard: SchemableParams1<G.URI> = params =>
  pipe(G.number, G.refine(isFloat(params)))

/**
 * @since 1.0.0
 * @category Instances
 */
export const TaskDecoder: SchemableParams2C<TD.URI> = params =>
  pipe(TD.number, TD.refine(isFloat(params), 'float'))

/**
 * @since 1.0.0
 * @category Instances
 */
export const Type: SchemableParams1<t.URI> = params =>
  pipe(t.number, t.refine(isFloat(params), 'float'))

/**
 * @since 1.0.0
 * @category Instances
 */
export const Encoder: SchemableParams2<Enc.URI> = () => Enc.id()

/**
 * @since 1.0.0
 * @category Instances
 */
export const Arbitrary: SchemableParams1<Arb.URI> = (params = {}) => {
  const { min = -Number.MAX_VALUE, max = Number.MAX_VALUE } = params
  return fc
    .double({
      min,
      max,
      noDefaultInfinity: true,
      noNaN: true,
    })
    .filter(isFloat(params))
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Schema: SchemableParams2<SchemaURI> = params => SC.make(S => S.float(params))
