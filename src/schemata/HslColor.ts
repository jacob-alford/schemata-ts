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
 */
export const HslColor: Schema<HslColor> = Brand<HslColorBrand>()(
  Pattern(k.patterns.hslColor, 'HslColor'),
)
