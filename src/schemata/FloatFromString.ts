/** @since 1.0.0 */
import { pipe } from 'fp-ts/function'
import { type Branded } from 'schemata-ts/brand'
import {
  type Float,
  type MaxNegativeFloat,
  type MaxPositiveFloat,
} from 'schemata-ts/float'
import * as PB from 'schemata-ts/PatternBuilder'
import { type Schema } from 'schemata-ts/Schema'
import { type NumberParams } from 'schemata-ts/schemables/primitives/definition'
import { PrimitivesGuard } from 'schemata-ts/schemables/primitives/instances/guard'
import { Brand } from 'schemata-ts/schemata/Brand'
import { Imap } from 'schemata-ts/schemata/Imap'
import { Pattern } from 'schemata-ts/schemata/Pattern'
import { Refine } from 'schemata-ts/schemata/Refine'

type FloatStringBrand<Min extends number, Max extends number> = {
  readonly FloatString: unique symbol
  readonly Min: Min
  readonly Max: Max
}

/**
 * A string that can safely be parsed to a floating point number.
 *
 * @since 2.0.0
 */
export type FloatString<
  Min extends number = MaxNegativeFloat,
  Max extends number = MaxPositiveFloat,
> = Branded<string, FloatStringBrand<Min, Max>>

/**
 * Negative floats with at least one digit before the decimal point.
 *
 * E.g. `-1.`; but neither `-.` nor `-`
 *
 * @since 1.0.0
 * @category Pattern
 */
const negativeFloatLeft: PB.Pattern = pipe(
  PB.char('-'),
  PB.then(pipe(PB.digit, PB.between(1, 308))),
  PB.then(
    pipe(PB.char('.'), PB.then(pipe(PB.digit, PB.anyNumber())), PB.subgroup, PB.maybe),
  ),
)

/**
 * Negative floats with at least one digit after the decimal point.
 *
 * E.g. `-.1`; but neither `-.` nor `-`
 *
 * @since 1.0.0
 * @category Pattern
 */
const negativeFloatRight: PB.Pattern = pipe(
  PB.char('-'),
  PB.then(pipe(PB.digit, PB.between(0, 308))),
  PB.then(
    pipe(PB.char('.'), PB.then(pipe(PB.digit, PB.atLeastOne())), PB.subgroup, PB.maybe),
  ),
)

/**
 * Positive floats with at least one digit before the decimal point.
 *
 * E.g. `1.` but not `.`
 *
 * @since 1.0.0
 * @category Pattern
 */
const positiveFloatLeft: PB.Pattern = pipe(
  PB.digit,
  PB.between(1, 308),
  PB.then(
    pipe(PB.char('.'), PB.then(pipe(PB.digit, PB.anyNumber())), PB.subgroup, PB.maybe),
  ),
)

/**
 * Positive floats with at least one digit after the decimal point.
 *
 * E.g. `.1` but not `.`
 *
 * @since 1.0.0
 * @category Pattern
 */
const positiveFloatRight: PB.Pattern = pipe(
  PB.digit,
  PB.between(0, 308),
  PB.then(
    pipe(PB.char('.'), PB.then(pipe(PB.digit, PB.atLeastOne())), PB.subgroup, PB.maybe),
  ),
)

/**
 * @since 1.0.0
 * @category Pattern
 */
const decimalFloat: PB.Pattern = PB.oneOf(
  negativeFloatLeft,
  negativeFloatRight,
  positiveFloatLeft,
  positiveFloatRight,
)

/**
 * @since 1.0.0
 * @category Pattern
 */
const positiveExponential: PB.Pattern = pipe(
  PB.char('+'),
  PB.maybe,
  PB.then(pipe(PB.integerRange(0, 308), PB.subgroup)),
)

/**
 * @since 1.0.0
 * @category Pattern
 */
const negativeExponential: PB.Pattern = pipe(
  PB.char('-'),
  PB.then(pipe(PB.digit, PB.atLeastOne(), PB.subgroup)),
)

/**
 * @since 1.0.0
 * @category Pattern
 */
const floatFromString: PB.Pattern = pipe(
  decimalFloat,
  PB.subgroup,
  PB.then(
    pipe(
      PB.char('e'),
      PB.then(pipe(PB.oneOf(positiveExponential, negativeExponential), PB.subgroup)),
      PB.subgroup,
      PB.maybe,
    ),
  ),
)

/**
 * Floating point branded newtype from strings. Parameters: min, max are inclusive.
 *
 * Represents string floating point numbers:
 *
 * ```math
 *  { f | f ∈ ℝ, f >= -Number.MAX_VALUE, f <= Number.MAX_VALUE }
 * ```
 *
 * @since 1.0.0
 * @category Conversion
 */
export const FloatFromString = <
  Min extends number | undefined = undefined,
  Max extends number | undefined = undefined,
>(
  params?: NumberParams<Min, Max>,
): Schema<
  FloatString<
    Min extends undefined ? MaxNegativeFloat : Min,
    Max extends undefined ? MaxPositiveFloat : Max
  >,
  Float<
    Min extends undefined ? MaxNegativeFloat : Min,
    Max extends undefined ? MaxPositiveFloat : Max
  >
> =>
  pipe(
    Pattern(floatFromString, 'FloatFromString'),
    Refine(
      (s): s is string => PrimitivesGuard.float(params).is(Number(s)) && s.trim() !== '',
      'FloatString',
    ),
    Brand<
      FloatStringBrand<
        Min extends undefined ? MaxNegativeFloat : Min,
        Max extends undefined ? MaxPositiveFloat : Max
      >
    >(),
    Imap(
      PrimitivesGuard.float(params),
      s =>
        Number(s) as Float<
          Min extends undefined ? MaxNegativeFloat : Min,
          Max extends undefined ? MaxPositiveFloat : Max
        >,
      n =>
        n.toString() as FloatString<
          Min extends undefined ? MaxNegativeFloat : Min,
          Max extends undefined ? MaxPositiveFloat : Max
        >,
    ),
  )
