/**
 * Floating point branded newtype from strings. Parameters: min, max are inclusive.
 *
 * Represents string floating point numbers:
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
import * as Str from 'fp-ts/string'
import * as N from 'fp-ts/number'
import { pipe } from 'fp-ts/function'
import { Type as Type_, failure } from 'io-ts'
import * as SC from '../SchemaExt'
import { URI as SchemaURI } from '../internal/SchemaBase'
import * as Arb from '../internal/ArbitraryBase'
import * as float from './float'

/**
 * @since 1.0.0
 * @category Model
 */
export type SchemableParams<S> = (
  params?: float.FloatParams,
) => HKT2<S, string, float.Float>

/**
 * @since 1.0.0
 * @category Model
 */
export type SchemableParams1<S extends URIS> = (
  params?: float.FloatParams,
) => Kind<S, float.Float>

/**
 * @since 1.0.0
 * @category Model
 */
export type SchemableParams2<S extends URIS2> = (
  params?: float.FloatParams,
) => Kind2<S, string, float.Float>

/**
 * @since 1.0.0
 * @category Model
 */
export type SchemableParams2C<S extends URIS2> = (
  params?: float.FloatParams,
) => Kind2<S, unknown, float.Float>

/**
 * @since 1.0.0
 * @category Instances
 */
export const Decoder: SchemableParams2C<D.URI> = params => ({
  decode: str =>
    typeof str === 'string' && str.length > 0
      ? pipe(str, Str.trim, Number, float.Decoder(params).decode)
      : D.failure(str, 'nonempty string'),
})

/**
 * @since 1.0.0
 * @category Instances
 */
export const Eq: SchemableParams1<Eq_.URI> = () => N.Eq

/**
 * @since 1.0.0
 * @category Instances
 */
export const Guard: SchemableParams1<G.URI> = float.Guard

/**
 * @since 1.0.0
 * @category Instances
 */
export const TaskDecoder: SchemableParams2C<TD.URI> = params => ({
  decode: str =>
    typeof str === 'string' && str.length > 0
      ? pipe(str, Str.trim, Number, float.TaskDecoder(params).decode)
      : TD.failure(str, 'nonempty string'),
})

/**
 * @since 1.0.0
 * @category Instances
 */
export const Type: SchemableParams1<t.URI> = params =>
  new Type_(
    'FloatFromString',
    Guard(params).is,
    (str, ctx) =>
      typeof str === 'string' && str.length > 0
        ? pipe(str, Str.trim, Number, float.Type(params).decode)
        : failure(str, ctx, 'nonempty string'),
    Encoder(params).encode,
  )

/**
 * @since 1.0.0
 * @category Instances
 */
export const Encoder: SchemableParams2<Enc.URI> = () => ({
  encode: n => n.toString(),
})

/**
 * @since 1.0.0
 * @category Instances
 */
export const Arbitrary: SchemableParams1<Arb.URI> = float.Arbitrary

/**
 * @since 1.0.0
 * @category Instances
 */
export const Schema: SchemableParams2<SchemaURI> = params =>
  SC.make(S => S.floatFromString(params))
