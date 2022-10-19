/**
 * Representing a Lat/Long coordinate.
 *
 * Inspired by
 * [validator.js::isLatLong](https://github.com/validatorjs/validator.js/blob/master/src/lib/isLatLong.js)
 *
 * @since 0.0.4
 */
import { Kind, Kind2, URIS, URIS2, HKT2 } from 'fp-ts/HKT'
import * as D from 'io-ts/Decoder'
import * as Enc from 'io-ts/Encoder'
import * as Eq_ from 'fp-ts/Eq'
import * as G from 'io-ts/Guard'
import * as Str from 'fp-ts/string'
import * as TD from 'io-ts/TaskDecoder'
import * as t from 'io-ts/Type'
import * as Arb from '../internal/ArbitraryBase'
import { pipe } from 'fp-ts/function'

/**
 * @since 0.0.4
 * @category Internal
 */
interface LatLongBrand {
  readonly LatLong: unique symbol
}

/**
 * Representing a Lat/Long coordinate.
 *
 * @since 0.0.4
 * @category Model
 */
export type LatLong = string & LatLongBrand

/**
 * @since 0.0.4
 * @category Model
 */
export type SchemableParams<S> = HKT2<S, string, LatLong>

/**
 * @since 0.0.4
 * @category Model
 */
export type SchemableParams1<S extends URIS> = Kind<S, LatLong>

/**
 * @since 0.0.4
 * @category Model
 */
export type SchemableParams2<S extends URIS2> = Kind2<S, string, LatLong>

/**
 * @since 0.0.4
 * @category Model
 */
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, LatLong>

const lat = /^\(?[+-]?(90(\.0+)?|[1-8]?\d(\.\d+)?)$/
const long = /^\s?[+-]?(180(\.0+)?|1[0-7]\d(\.\d+)?|\d{1,2}(\.\d+)?)\)?$/

/**
 * @since 0.0.4
 * @category Refinements
 */
export const isLatLong = (str: string): str is LatLong => {
  if (!str.includes(',')) {
    return false
  }

  const pair = str.split(',')

  if (pair[0] && pair[1]) {
    if (
      (pair[0].startsWith('(') && !pair[1].endsWith(')')) ||
      (pair[1].endsWith(')') && !pair[0].startsWith('('))
    ) {
      return false
    }

    return lat.test(pair[0]) && long.test(pair[1])
  }

  return false
}

/**
 * @since 0.0.4
 * @category Instances
 */
export const Decoder: SchemableParams2C<D.URI> = pipe(
  D.string,
  D.refine(isLatLong, 'LatLong')
)

/**
 * @since 0.0.4
 * @category Instances
 */
export const Encoder: SchemableParams2<Enc.URI> = Enc.id()

/**
 * @since 0.0.4
 * @category Instances
 */
export const Eq: SchemableParams1<Eq_.URI> = Str.Eq

/**
 * @since 0.0.4
 * @category Instances
 */
export const Guard: SchemableParams1<G.URI> = pipe(G.string, G.refine(isLatLong))

/**
 * @since 0.0.4
 * @category Instances
 */
export const TaskDecoder: SchemableParams2C<TD.URI> = pipe(
  TD.string,
  TD.refine(isLatLong, 'LatLong')
)

/**
 * @since 0.0.4
 * @category Instances
 */
export const Type: SchemableParams1<t.URI> = pipe(
  t.string,
  t.refine(isLatLong, 'LatLong')
)

/**
 * @since 0.0.4
 * @category Instances
 */
export const Arbitrary: SchemableParams1<Arb.URI> = pipe(
  Arb.string,
  Arb.refine(isLatLong)
)
