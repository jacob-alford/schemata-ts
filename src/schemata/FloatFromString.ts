/** @since 1.0.0 */
import { pipe } from 'fp-ts/function'
import * as k from 'kuvio'
import { type Branded } from 'schemata-ts/brand'
import {
  type Float,
  type MaxNegativeFloat,
  type MaxPositiveFloat,
} from 'schemata-ts/float'
import { type Schema } from 'schemata-ts/Schema'
import { PrimitivesGuard } from 'schemata-ts/schemables/primitives/instances/guard'
import { Brand } from 'schemata-ts/schemata/Brand'
import { Imap } from 'schemata-ts/schemata/Imap'
import { Pattern } from 'schemata-ts/schemata/Pattern'
import { Refine } from 'schemata-ts/schemata/Refine'

type FloatStringBrand<Min, Max> = {
  readonly FloatString: unique symbol
  readonly Min: Min
  readonly Max: Max
}

/**
 * A string that can safely be parsed to a floating point number.
 *
 * @since 2.0.0
 */
export type FloatString<Min = MaxNegativeFloat, Max = MaxPositiveFloat> = Branded<
  string,
  FloatStringBrand<Min, Max>
>

/**
 * Negative floats with at least one digit before the decimal point.
 *
 * E.g. `-1.`; but neither `-.` nor `-`
 *
 * @since 1.0.0
 * @category Pattern
 */
const negativeFloatLeft: k.Pattern = pipe(
  k.char('-'),
  k.andThen(pipe(k.digit, k.between(1, 308))),
  k.andThen(
    pipe(k.char('.'), k.andThen(pipe(k.digit, k.anyNumber())), k.subgroup, k.maybe),
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
const negativeFloatRight: k.Pattern = pipe(
  k.char('-'),
  k.andThen(pipe(k.digit, k.between(0, 308))),
  k.andThen(
    pipe(k.char('.'), k.andThen(pipe(k.digit, k.atLeastOne())), k.subgroup, k.maybe),
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
const positiveFloatLeft: k.Pattern = pipe(
  k.digit,
  k.between(1, 308),
  k.andThen(
    pipe(k.char('.'), k.andThen(pipe(k.digit, k.anyNumber())), k.subgroup, k.maybe),
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
const positiveFloatRight: k.Pattern = pipe(
  k.digit,
  k.between(0, 308),
  k.andThen(
    pipe(k.char('.'), k.andThen(pipe(k.digit, k.atLeastOne())), k.subgroup, k.maybe),
  ),
)

/**
 * @since 1.0.0
 * @category Pattern
 */
const decimalFloat: k.Pattern = k.oneOf(
  negativeFloatLeft,
  negativeFloatRight,
  positiveFloatLeft,
  positiveFloatRight,
)

/**
 * @since 1.0.0
 * @category Pattern
 */
const positiveExponential: k.Pattern = pipe(
  k.char('+'),
  k.maybe,
  k.andThen(pipe(k.integerRange(0, 308), k.subgroup)),
)

/**
 * @since 1.0.0
 * @category Pattern
 */
const negativeExponential: k.Pattern = pipe(
  k.char('-'),
  k.andThen(pipe(k.digit, k.atLeastOne(), k.subgroup)),
)

/**
 * @since 1.0.0
 * @category Pattern
 */
const floatFromString: k.Pattern = pipe(
  decimalFloat,
  k.subgroup,
  k.andThen(
    pipe(
      k.char('e'),
      k.andThen(pipe(k.oneOf(positiveExponential, negativeExponential), k.subgroup)),
      k.subgroup,
      k.maybe,
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
 * @deprecated Use `ParseFloat` instead.
 * @since 1.0.0
 * @category Conversion
 */
export const FloatFromString: Schema<FloatString, Float> = pipe(
  Pattern(floatFromString, ['FloatString', 'Float']),
  Refine(
    (s): s is string => PrimitivesGuard.float().is(Number(s)) && s.trim() !== '',
    'Float',
  ),
  Brand<FloatStringBrand<MaxNegativeFloat, MaxPositiveFloat>>(),
  Imap(
    PrimitivesGuard.float(),
    s => Number(s) as Float,
    n => n.toString() as FloatString,
  ),
)
