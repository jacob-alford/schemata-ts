/**
 * A valid hexadecimal color value.
 *
 * Inspired by
 * [isHexColor](https://github.com/validatorjs/validator.js/blob/master/src/lib/isHexColor.js)
 *
 * @since 0.0.3
 */
import { Kind, Kind2, URIS, URIS2, HKT2 } from 'fp-ts/HKT'
import * as D from 'io-ts/Decoder'
import * as Enc from 'io-ts/Encoder'
import * as Eq_ from 'fp-ts/Eq'
import * as G from 'io-ts/Guard'
import * as Str from 'fp-ts/string'
import * as TD from 'io-ts/TaskDecoder'
import * as t from 'io-ts/Type'
import { pipe } from 'fp-ts/function'

/**
 * @since 0.0.3
 * @category Internal
 */
interface HexColorBrand {
  readonly HexColor: unique symbol
}

/**
 * A valid hexadecimal color value.
 *
 * Inspired by
 * [isHexColor](https://github.com/validatorjs/validator.js/blob/master/src/lib/isHexColor.js)
 *
 * @since 0.0.3
 * @category Model
 */
export type HexColor = string & HexColorBrand

/**
 * @since 0.0.3
 * @category Model
 */
export type SchemableParams<S> = HKT2<S, string, HexColor>

/**
 * @since 0.0.3
 * @category Model
 */
export type SchemableParams1<S extends URIS> = Kind<S, HexColor>

/**
 * @since 0.0.3
 * @category Model
 */
export type SchemableParams2<S extends URIS2> = Kind2<S, string, HexColor>

/**
 * @since 0.0.3
 * @category Model
 */
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, HexColor>

const hexcolor = /^#?([0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6}|[0-9A-F]{8})$/i

/**
 * @since 0.0.3
 * @category Refinements
 */
export const isHexColor = (s: string): s is HexColor => hexcolor.test(s)

/**
 * @since 0.0.3
 * @category Instances
 */
export const Decoder: SchemableParams2C<D.URI> = pipe(
  D.string,
  D.refine(isHexColor, 'HexColor')
)

/**
 * @since 0.0.3
 * @category Instances
 */
export const Encoder: SchemableParams2<Enc.URI> = Enc.id()

/**
 * @since 0.0.3
 * @category Instances
 */
export const Eq: SchemableParams1<Eq_.URI> = Str.Eq

/**
 * @since 0.0.3
 * @category Instances
 */
export const Guard: SchemableParams1<G.URI> = pipe(G.string, G.refine(isHexColor))

/**
 * @since 0.0.3
 * @category Instances
 */
export const TaskDecoder: SchemableParams2C<TD.URI> = pipe(
  TD.string,
  TD.refine(isHexColor, 'HexColor')
)

/**
 * @since 0.0.3
 * @category Instances
 */
export const Type: SchemableParams1<t.URI> = pipe(
  t.string,
  t.refine(isHexColor, 'HexColor')
)
