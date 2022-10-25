/**
 * Integer branded newtype from string. Parameters: min, max are inclusive.
 *
 * Represents string-integers:
 *
 * ```math
 *  { z | z ∈ ℤ, z >= -2 ** 53 + 1, z <= 2 ** 53 - 1 }
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
import { flow } from 'fp-ts/function'
import { Type as Type_ } from 'io-ts'

import * as Arb from '../internal/ArbitraryBase'
import * as int from './int'

/**
 * @since 1.0.0
 * @category Model
 */
export type SchemableParams<S> = (params?: int.IntParams) => HKT2<S, string, int.Int>

/**
 * @since 1.0.0
 * @category Model
 */
export type SchemableParams1<S extends URIS> = (
  params?: int.IntParams
) => Kind<S, int.Int>

/**
 * @since 1.0.0
 * @category Model
 */
export type SchemableParams2<S extends URIS2> = (
  params?: int.IntParams
) => Kind2<S, string, int.Int>

/**
 * @since 1.0.0
 * @category Model
 */
export type SchemableParams2C<S extends URIS2> = (
  params?: int.IntParams
) => Kind2<S, unknown, int.Int>

/**
 * @since 1.0.0
 * @category Instances
 */
export const Decoder: SchemableParams2C<D.URI> = params => ({
  decode: flow(Number, int.Decoder(params).decode),
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
export const Guard: SchemableParams1<G.URI> = int.Guard

/**
 * @since 1.0.0
 * @category Instances
 */
export const TaskDecoder: SchemableParams2C<TD.URI> = params => ({
  decode: flow(Number, int.TaskDecoder(params).decode),
})

/**
 * @since 1.0.0
 * @category Instances
 */
export const Type: SchemableParams1<t.URI> = params =>
  new Type_(
    'IntFromString',
    Guard(params).is,
    flow(Number, int.Type(params).decode),
    Encoder(params).encode
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
export const Arbitrary: SchemableParams1<Arb.URI> = int.Arbitrary
