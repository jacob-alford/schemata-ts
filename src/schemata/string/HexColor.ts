/**
 * A valid hexadecimal color value.
 *
 * @since 1.0.0
 */
import { pipe } from 'fp-ts/function'
import { Branded } from 'io-ts'

import * as PB from '../../PatternBuilder'
import { make, SchemaExt } from '../../SchemaExt'

/** @internal */
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
 * @since 1.0.0
 * @category Model
 */
export type HexColorS = SchemaExt<string, HexColor>

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
export const HexColor: HexColorS = make(s =>
  s.brand<HexColorBrand>()(s.pattern(hexColor, 'HexColor', true)),
)
