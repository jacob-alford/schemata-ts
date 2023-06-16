/**
 * A valid hexadecimal color value.
 *
 * @since 1.0.0
 */
import { pipe } from 'fp-ts/function'
import { Branded } from 'schemata-ts/brand'
import * as PB from 'schemata-ts/PatternBuilder'
import { Schema } from 'schemata-ts/Schema'
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
 * /^#?([0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6}|[0-9A-F]{8})$/i
 *
 * @since 1.0.0
 * @category Pattern
 */
export const hexColor: PB.Pattern = pipe(
  PB.maybe(PB.char('#')),
  PB.then(
    PB.subgroup(
      pipe(
        PB.between(3, 4)(PB.hexDigit),
        PB.or(PB.exactly(6)(PB.hexDigit)),
        PB.or(PB.exactly(8)(PB.hexDigit)),
      ),
    ),
  ),
)

/**
 * A valid hexadecimal color value.
 *
 * @since 1.0.0
 * @category Schema
 */
export const HexColor: Schema<HexColor, HexColor> = Brand<HexColorBrand>()(
  Pattern(hexColor, 'HexColor'),
)
