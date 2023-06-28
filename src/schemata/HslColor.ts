/** @since 1.0.0 */
import * as k from 'kuvio'
import { type Branded } from 'schemata-ts/brand'
import { type Schema } from 'schemata-ts/Schema'
import { Brand } from 'schemata-ts/schemata/Brand'
import { Pattern } from 'schemata-ts/schemata/Pattern'

interface HslColorBrand {
  readonly HslColor: unique symbol
}

/**
 * An HSL string. Commonly in CSS.
 *
 * @since 1.0.0
 * @category Model
 */
export type HslColor = Branded<string, HslColorBrand>

/**
 * @since 1.0.0
 * @category String
 * @example
 *   import { HslColor } from 'schemata-ts/schemata/string/HslColor'
 *   import { getGuard } from 'schemata-ts/Guard'
 *
 *   const hue = 270
 *   const saturation = 60
 *   const lightness = 70
 *   const alpha = 0.7
 *
 *   const hslString = `hsl(${hue} ${saturation}% ${lightness}% / ${alpha})`
 *   const Guard = getGuard(HslColor)
 *
 *   assert.equal(Guard.is(hslString), true)
 */
export const HslColor: Schema<HslColor> = Brand<HslColorBrand>()(
  Pattern(k.patterns.hslColor, 'HslColor'),
)
