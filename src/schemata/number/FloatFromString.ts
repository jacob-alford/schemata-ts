/**
 * Floating point branded newtype from strings. Parameters: min, max are inclusive.
 *
 * Note: doesn't technically product lawful encoder / decoders because `toString` is not
 * symmetric with `Number`.
 *
 * Represents string floating point numbers:
 *
 * ```math
 *  { f | f ∈ ℝ, f >= -Number.MAX_VALUE, f <= Number.MAX_VALUE }
 * ```
 *
 * @since 1.0.0
 */
import { pipe } from 'fp-ts/function'
import { SchemaExt, make } from '../../SchemaExt'
import * as Float from '../../schemables/WithFloat'
import * as PB from '../../PatternBuilder'

/**
 * @since 1.0.0
 * @category Model
 */
export type FloatFromStringS = (
  params?: Float.FloatParams,
) => SchemaExt<string, Float.Float>

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
  PB.then(pipe(PB.digit, PB.anyNumber(), PB.subgroup)),
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
 */
export const FloatFromString: FloatFromStringS = params =>
  make(S =>
    pipe(
      S.pattern(floatFromString, 'FloatFromString'),
      S.refine(
        (s): s is string => Float.Guard.float(params).is(Number(s)) && s.trim() !== '',
        'SafeFloatString',
      ),
      S.imap(Float.Guard.float(params), 'FloatFromString')(
        (s: string) => Number(s) as Float.Float,
        (n: Float.Float) => n.toString(),
      ),
    ),
  )
