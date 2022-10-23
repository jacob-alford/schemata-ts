/**
 * An HSL string. Commonly in CSS.
 *
 * @since 0.0.3
 * @example
 *   import { Guard } from 'schemata-ts/string/HslColor'
 *
 *   const hue = 270
 *   const saturation = 60
 *   const lightness = 70
 *   const alpha = 0.7
 *
 *   const hslString = `hsl(${hue} ${saturation}% ${lightness}% / ${alpha})`
 *
 *   assert.equal(Guard.is(hslString), true)
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

import * as fc from 'fast-check'

import * as Arb from '../internal/ArbitraryBase'

/**
 * @since 0.0.3
 * @internal
 */
interface HslColorBrand {
  readonly HslColor: unique symbol
}

/**
 * An HSL string. Commonly in CSS.
 *
 * @since 0.0.3
 * @example
 *   import { Guard } from 'schemata-ts/string/HslColor'
 *
 *   const hue = 270
 *   const saturation = 60
 *   const lightness = 70
 *   const alpha = 0.7
 *
 *   const hslString = `hsl(${hue} ${saturation}% ${lightness}% / ${alpha})`
 *
 *   assert.equal(Guard.is(hslString), true)
 */
export type HslColor = string & HslColorBrand

/**
 * @since 0.0.3
 * @category Model
 */
export type SchemableParams<S> = HKT2<S, string, HslColor>

/**
 * @since 0.0.3
 * @category Model
 */
export type SchemableParams1<S extends URIS> = Kind<S, HslColor>

/**
 * @since 0.0.3
 * @category Model
 */
export type SchemableParams2<S extends URIS2> = Kind2<S, string, HslColor>

/**
 * @since 0.0.3
 * @category Model
 */
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, HslColor>

const hslComma =
  /^hsla?\(((\+|-)?([0-9]+(\.[0-9]+)?(e(\+|-)?[0-9]+)?|\.[0-9]+(e(\+|-)?[0-9]+)?))(deg|grad|rad|turn)?(,(\+|-)?([0-9]+(\.[0-9]+)?(e(\+|-)?[0-9]+)?|\.[0-9]+(e(\+|-)?[0-9]+)?)%){2}(,((\+|-)?([0-9]+(\.[0-9]+)?(e(\+|-)?[0-9]+)?|\.[0-9]+(e(\+|-)?[0-9]+)?)%?))?\)$/i

const hslSpace =
  /^hsla?\(((\+|-)?([0-9]+(\.[0-9]+)?(e(\+|-)?[0-9]+)?|\.[0-9]+(e(\+|-)?[0-9]+)?))(deg|grad|rad|turn)?(\s(\+|-)?([0-9]+(\.[0-9]+)?(e(\+|-)?[0-9]+)?|\.[0-9]+(e(\+|-)?[0-9]+)?)%){2}\s?(\/\s((\+|-)?([0-9]+(\.[0-9]+)?(e(\+|-)?[0-9]+)?|\.[0-9]+(e(\+|-)?[0-9]+)?)%?)\s?)?\)$/i

/**
 * @since 0.0.3
 * @category Refinements
 */
export const isHslColor = (s: string): s is HslColor => {
  /**
   * Strip duplicate spaces before calling the validation regex
   *
   * @see https://github.com/validatorjs/validator.js/issues/1598
   */
  const strippedStr = s.replace(/\s+/g, ' ').replace(/\s?(hsla?\(|\)|,)\s?/gi, '$1')

  if (strippedStr.indexOf(',') !== -1) {
    return hslComma.test(strippedStr)
  } else {
    return hslSpace.test(strippedStr)
  }
}

/**
 * @since 0.0.3
 * @category Instances
 */
export const Decoder: SchemableParams2C<D.URI> = pipe(
  D.string,
  D.refine(isHslColor, 'HslColor')
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
export const Guard: SchemableParams1<G.URI> = pipe(G.string, G.refine(isHslColor))

/**
 * @since 0.0.3
 * @category Instances
 */
export const TaskDecoder: SchemableParams2C<TD.URI> = pipe(
  TD.string,
  TD.refine(isHslColor, 'HslColor')
)

/**
 * @since 0.0.3
 * @category Instances
 */
export const Type: SchemableParams1<t.URI> = pipe(
  t.string,
  t.refine(isHslColor, 'HslColor')
)

/**
 * @since 0.0.3
 * @category Instances
 */
export const Arbitrary: SchemableParams1<Arb.URI> = fc
  .tuple(
    fc.integer({ min: 0, max: 360 }),
    fc.integer({ min: 0, max: 100 }),
    fc.integer({ min: 0, max: 100 }),
    fc.float()
  )
  .map(
    ([hue, saturation, lightness, alpha]) =>
      `hsl(${hue}deg ${saturation}% ${lightness}% / ${alpha})`
  ) as Arb.Arbitrary<HslColor>
