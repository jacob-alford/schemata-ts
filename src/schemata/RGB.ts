/** @since 1.0.0 */
import * as k from 'kuvio'
import { type Branded } from 'schemata-ts/brand'
import { type Schema } from 'schemata-ts/Schema'
import { Brand } from 'schemata-ts/schemata/Brand'
import { Pattern } from 'schemata-ts/schemata/Pattern'

interface RGBBrand {
  readonly RGB: unique symbol
}

/**
 * Represents strings which are valid RGB colors. Permits both absolute and percentage based values.
 *
 * @since 1.0.0
 * @category Model
 */
export type RGB = Branded<string, RGBBrand>

/**
 * Represents strings which are valid RGB colors. Permits both absolute and percentage based values.
 *
 * @since 1.0.0
 * @category String
 */
export const RGB: Schema<RGB> = Brand<RGBBrand>()(Pattern(k.patterns.rgbColor, 'RGB'))
