/**
 * Represents strings which are valid RGB colors. Permits both absolute and percentage based values.
 *
 * @since 1.0.0
 */
import { Branded } from 'schemata-ts/brand'
import * as PB from 'schemata-ts/PatternBuilder'
import { make, Schema } from 'schemata-ts/Schema'

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
 * @since 1.0.0
 * @category Model
 */
export type RGBS = Schema<string, RGB>

const rgbColor = PB.sequence(
  PB.exactString('rgb('),
  PB.subgroup(PB.integerRange(0, 255)),
  PB.char(','),
  PB.subgroup(PB.integerRange(0, 255)),
  PB.char(','),
  PB.subgroup(PB.integerRange(0, 255)),
  PB.char(')'),
)

const rgbColorWithAlpha = PB.sequence(
  PB.exactString('rgba('),
  PB.subgroup(PB.integerRange(0, 255)),
  PB.char(','),
  PB.subgroup(PB.integerRange(0, 255)),
  PB.char(','),
  PB.subgroup(PB.integerRange(0, 255)),
  PB.char(','),
  PB.subgroup(
    PB.oneOf(
      PB.char('0'),
      PB.char('1'),
      PB.exactString('1.0'),
      PB.sequence(
        PB.maybe(PB.char('0')),
        PB.char('.'),
        PB.atLeastOne({ greedy: true })(PB.digit),
      ),
    ),
  ),
  PB.char(')'),
)

const rgbColorPercent = PB.sequence(
  PB.exactString('rgb('),
  PB.subgroup(PB.integerRange(0, 100)),
  PB.exactString('%,'),
  PB.subgroup(PB.integerRange(0, 100)),
  PB.exactString('%,'),
  PB.subgroup(PB.integerRange(0, 100)),
  PB.exactString('%)'),
)

const rgbColorWithAlphaPercent = PB.sequence(
  PB.exactString('rgba('),
  PB.subgroup(PB.integerRange(0, 100)),
  PB.exactString('%,'),
  PB.subgroup(PB.integerRange(0, 100)),
  PB.exactString('%,'),
  PB.subgroup(PB.integerRange(0, 100)),
  PB.exactString('%,'),
  PB.subgroup(
    PB.oneOf(
      PB.char('0'),
      PB.char('1'),
      PB.exactString('1.0'),
      PB.sequence(
        PB.maybe(PB.char('0')),
        PB.char('.'),
        PB.atLeastOne({ greedy: true })(PB.digit),
      ),
    ),
  ),
  PB.char(')'),
)

/**
 * @since 1.0.0
 * @category Pattern
 */
export const RGBPattern = PB.oneOf(
  rgbColor,
  rgbColorWithAlpha,
  rgbColorPercent,
  rgbColorWithAlphaPercent,
)

/**
 * Represents strings which are valid RGB colors. Permits both absolute and percentage based values.
 *
 * @since 1.0.0
 * @category Schema
 */
export const RGB: RGBS = make(s => s.brand<RGBBrand>()(s.pattern(RGBPattern, 'RGB')))
