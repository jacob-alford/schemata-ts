/**
 * Represents strings which are valid RGB colors. Permits both absolute and percentage based values.
 *
 * @since 0.0.4
 */
import { Kind, Kind2, URIS, URIS2, HKT2 } from 'fp-ts/HKT'
import * as D from 'io-ts/Decoder'
import * as Enc from 'io-ts/Encoder'
import * as fc from 'fast-check'
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
interface RGBBrand {
  readonly RGB: unique symbol
}

/**
 * Represents strings which are valid RGB colors. Permits both absolute and percentage based values.
 *
 * @since 0.0.4
 * @category Model
 */
export type RGB = string & RGBBrand

/**
 * @since 0.0.4
 * @category Model
 */
export type SchemableParams<S> = HKT2<S, string, RGB>

/**
 * @since 0.0.4
 * @category Model
 */
export type SchemableParams1<S extends URIS> = Kind<S, RGB>

/**
 * @since 0.0.4
 * @category Model
 */
export type SchemableParams2<S extends URIS2> = Kind2<S, string, RGB>

/**
 * @since 0.0.4
 * @category Model
 */
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, RGB>

/** @internal */
const rgbColor =
  /^rgb\((([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]),){2}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\)$/

/** @internal */
const rgbaColor =
  /^rgba\((([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]),){3}(0?\.\d|1(\.0)?|0(\.0)?)\)$/

/** @internal */
const rgbColorPercent = /^rgb\((([0-9]%|[1-9][0-9]%|100%),){2}([0-9]%|[1-9][0-9]%|100%)\)/

/** @internal */
const rgbaColorPercent =
  /^rgba\((([0-9]%|[1-9][0-9]%|100%),){3}(0?\.\d|1(\.0)?|0(\.0)?)\)/

/**
 * @since 0.0.4
 * @category Refinements
 */
export const isRGB = (s: string): s is RGB =>
  typeof s === 'string' &&
  (rgbColor.test(s) ||
    rgbaColor.test(s) ||
    rgbColorPercent.test(s) ||
    rgbaColorPercent.test(s))

/**
 * @since 0.0.4
 * @category Instances
 */
export const Decoder: SchemableParams2C<D.URI> = pipe(D.string, D.refine(isRGB, 'RGB'))

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
export const Guard: SchemableParams1<G.URI> = pipe(G.string, G.refine(isRGB))

/**
 * @since 0.0.4
 * @category Instances
 */
export const TaskDecoder: SchemableParams2C<TD.URI> = pipe(
  TD.string,
  TD.refine(isRGB, 'RGB')
)

/**
 * @since 0.0.4
 * @category Instances
 */
export const Type: SchemableParams1<t.URI> = pipe(t.string, t.refine(isRGB, 'RGB'))

/**
 * @since 0.0.4
 * @category Instances
 */
export const Arbitrary: SchemableParams1<Arb.URI> = fc
  .oneof(
    /* RGB > Absolute */
    fc
      .tuple(fc.nat({ max: 255 }), fc.nat({ max: 255 }), fc.nat({ max: 255 }))
      .map(([r, g, b]) => `rgb(${r},${g},${b})`),
    /* RGBA > Absolute */
    fc
      .tuple(
        fc.nat({ max: 255 }),
        fc.nat({ max: 255 }),
        fc.nat({ max: 255 }),
        fc.nat({ max: 255 })
      )
      .map(([r, g, b, a]) => `rgba(${r},${g},${b},${a / 255})`),
    /* RGB > Percentage */
    fc
      .tuple(fc.nat({ max: 255 }), fc.nat({ max: 255 }), fc.nat({ max: 255 }))
      .map(
        ([r, g, b]) => `rgb(${(r / 255) * 100}%,${(g / 255) * 100}%,${(b / 255) * 100}%)`
      ),
    /* RGBA > Percentage */
    fc
      .tuple(
        fc.nat({ max: 255 }),
        fc.nat({ max: 255 }),
        fc.nat({ max: 255 }),
        fc.nat({ max: 255 })
      )
      .map(
        ([r, g, b, a]) =>
          `rgba(${(r / 255) * 100}%,${(g / 255) * 100}%,${(b / 255) * 100}%,${a / 255})`
      )
  )
  .filter(isRGB)
