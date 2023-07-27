/** @since 1.0.0 */
import * as k from 'kuvio'
import { type Branded } from 'schemata-ts/brand'
import { type Schema } from 'schemata-ts/Schema'
import { Brand } from 'schemata-ts/schemata/Brand'
import { Pattern } from 'schemata-ts/schemata/Pattern'

interface HexColorBrand {
  readonly HexColor: unique symbol
}

/**
 * A valid hexadecimal color value.
 *
 * @since 1.0.0
 * @category Model
 */
export type HexColor = Branded<string, HexColorBrand>

/**
 * A valid hexadecimal color value.
 *
 * @since 1.0.0
 * @category String
 */
export const HexColor: Schema<HexColor> = Brand<HexColorBrand>()(
  Pattern(k.patterns.hexColor, 'HexColor'),
)
