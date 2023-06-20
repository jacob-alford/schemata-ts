/**
 * An HSL string. Commonly in CSS.
 *
 * @since 1.0.0
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
import { pipe } from 'fp-ts/function'
import { type Branded } from 'schemata-ts/brand'
import * as PB from 'schemata-ts/PatternBuilder'
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
export type HslColor = Branded<string, HslColorBrand>

const anyDecimal = PB.subgroup(
  PB.sequence(PB.char('.'), PB.atLeastOne({ greedy: true })(PB.digit)),
)

const zeroDecimal = PB.subgroup(
  PB.sequence(PB.char('.'), PB.atLeastOne({ greedy: true })(PB.char('0'))),
)

const exponential = PB.subgroup(
  PB.sequence(
    PB.char('e'),
    PB.maybe(PB.subgroup(PB.oneOf(PB.char('+'), PB.char('-')))),
    PB.atLeastOne({ greedy: true })(PB.digit),
  ),
)

const hue = PB.subgroup(
  PB.sequence(
    PB.maybe(PB.subgroup(PB.oneOf(PB.char('+'), PB.char('-')))),
    PB.subgroup(
      PB.oneOf(
        pipe(PB.atLeastOne({ greedy: true })(PB.digit), PB.then(PB.maybe(anyDecimal))),
        anyDecimal,
      ),
    ),
    PB.maybe(exponential),
    PB.maybe(
      PB.subgroup(
        PB.oneOf(
          PB.exactString('deg'),
          PB.exactString('grad'),
          PB.exactString('rad'),
          PB.exactString('turn'),
        ),
      ),
    ),
  ),
)

const percentage = PB.subgroup(
  PB.sequence(
    PB.maybe(PB.char('+')),
    PB.anyNumber({ greedy: true })(PB.char('0')),
    PB.subgroup(
      PB.oneOf(
        pipe(PB.exactString('100'), PB.then(PB.maybe(zeroDecimal))),
        pipe(PB.subgroup(PB.integerRange(0, 99)), PB.then(PB.maybe(anyDecimal))),
        anyDecimal,
      ),
    ),
    PB.maybe(exponential),
    PB.char('%'),
  ),
)

const alpha = PB.subgroup(
  PB.sequence(
    PB.anyNumber({ greedy: true })(PB.digit),
    PB.subgroup(PB.oneOf(PB.digit, anyDecimal)),
    PB.maybe(exponential),
    PB.maybe(PB.char('%')),
  ),
)

const anySpace = PB.anyNumber({ greedy: true })(PB.blank)

const commaDelimiter = PB.subgroup(PB.sequence(anySpace, PB.char(','), anySpace))

const slashDelimiter = PB.subgroup(PB.sequence(anySpace, PB.char('/'), anySpace))

/**
 * @since 1.0.0
 * @category Pattern
 */
export const hslPattern = PB.sequence(
  PB.exactString('hsl'),
  PB.maybe(PB.char('a')),
  PB.char('('),
  anySpace,
  hue,
  PB.subgroup(
    PB.oneOf(
      PB.sequence(
        commaDelimiter,
        percentage,
        commaDelimiter,
        percentage,
        PB.maybe(PB.subgroup(PB.sequence(commaDelimiter, alpha))),
      ),
      PB.sequence(
        anySpace,
        percentage,
        anySpace,
        percentage,
        PB.maybe(PB.subgroup(PB.sequence(slashDelimiter, alpha))),
      ),
    ),
  ),
  anySpace,
  PB.char(')'),
)

/**
 * @since 1.0.0
 * @category Schema
 */
export const HslColor: Schema<HslColor> = Brand<HslColorBrand>()(
  Pattern(hslPattern, 'HslColor'),
)
