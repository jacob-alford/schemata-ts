/**
 * Integer branded newtype from string. Parameters: min, max are inclusive.
 *
 * Note: has an optional `encodeToBase` parameter that controls the output base of the
 * encoded string. Currently only accepts 2, 8, 10, and 16 due to constraints using
 * `Number` as a parser. It does not decode in this specified base, and accepts any base
 * as input: 2, 8, 10, or 16.
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
import * as Str from 'fp-ts/string'
import { pipe } from 'fp-ts/function'
import { failure, Type as Type_ } from 'io-ts'
import * as SC from '../SchemaExt'
import { URI as SchemaURI } from '../internal/SchemaBase'
import * as Arb from '../internal/ArbitraryBase'
import * as int from './int'

/**
 * Controls the output base of the encoded string. Currently only accepts 2, 8, 10, and 16
 * due to constraints using `Number` as a parser. It does not decode in this specified
 * base, and accepts any base as input: 2, 8, 10, or 16.
 *
 * @since 1.0.0
 */
export type IntFromStringParams = {
  readonly encodeToBase?: 2 | 8 | 10 | 16
}

/**
 * @since 1.0.0
 * @category Model
 */
export type SchemableParams<S> = (
  params?: int.IntParams & IntFromStringParams
) => HKT2<S, string, int.Int>

/**
 * @since 1.0.0
 * @category Model
 */
export type SchemableParams1<S extends URIS> = (
  params?: int.IntParams & IntFromStringParams
) => Kind<S, int.Int>

/**
 * @since 1.0.0
 * @category Model
 */
export type SchemableParams2<S extends URIS2> = (
  params?: int.IntParams & IntFromStringParams
) => Kind2<S, string, int.Int>

/**
 * @since 1.0.0
 * @category Model
 */
export type SchemableParams2C<S extends URIS2> = (
  params?: int.IntParams & IntFromStringParams
) => Kind2<S, unknown, int.Int>

/**
 * @since 1.0.0
 * @category Instances
 */
export const Decoder: SchemableParams2C<D.URI> = params => ({
  decode: str =>
    typeof str === 'string' && str.length > 0
      ? pipe(str, Str.trim, Number, int.Decoder(params).decode)
      : D.failure(str, 'Nonempty string'),
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
  decode: str =>
    typeof str === 'string' && str.length > 0
      ? pipe(str, Str.trim, Number, int.TaskDecoder(params).decode)
      : TD.failure(str, 'Nonempty string'),
})

/**
 * @since 1.0.0
 * @category Instances
 */
export const Type: SchemableParams1<t.URI> = params =>
  new Type_(
    'IntFromString',
    Guard(params).is,
    (str, ctx) =>
      typeof str === 'string' && str.length > 0
        ? pipe(str, Str.trim, Number, int.Type(params).decode)
        : failure(str, ctx, 'Nonempty string'),
    Encoder(params).encode
  )

/** @internal */
const baseToPrefix = (base: IntFromStringParams['encodeToBase']): string => {
  switch (base) {
    case 2:
      return `0b`
    case 8:
      return `0o`
    case 16:
      return `0x`
    default:
      return ''
  }
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Encoder: SchemableParams2<Enc.URI> = (params = {}) => {
  const { encodeToBase } = params
  return {
    encode: n => `${baseToPrefix(encodeToBase)}${n.toString(encodeToBase)}`,
  }
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Arbitrary: SchemableParams1<Arb.URI> = int.Arbitrary

/**
 * @since 1.0.0
 * @category Instances
 */
export const Schema: SchemableParams2<SchemaURI> = params =>
  SC.make(S => S.intFromString(params))
