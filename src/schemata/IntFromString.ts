/** @since 1.0.0 */
import { pipe } from 'fp-ts/function'
import * as k from 'kuvio'
import { type Branded } from 'schemata-ts/brand'
import { type Integer, type MaxSafeInt, type MinSafeInt } from 'schemata-ts/integer'
import { type Schema } from 'schemata-ts/Schema'
import { PrimitivesGuard } from 'schemata-ts/schemables/primitives/instances/guard'
import { PrimitivesTypeString } from 'schemata-ts/schemables/primitives/instances/type-string'
import { Brand } from 'schemata-ts/schemata/Brand'
import { Imap } from 'schemata-ts/schemata/Imap'
import { Pattern } from 'schemata-ts/schemata/Pattern'

type IntStringBrand<Min, Max> = {
  readonly IntString: unique symbol
  readonly min: Min
  readonly max: Max
}

/**
 * A string that can safely be parsed to a floating point number.
 *
 * @since 2.0.0
 */
export type IntString<Min = MinSafeInt, Max = MaxSafeInt> = Branded<
  string,
  IntStringBrand<Min, Max>
>

/**
 * @since 1.0.0
 * @category Pattern
 */
const binaryIntString: k.Pattern = pipe(
  k.exactString('0b'),
  k.then(pipe(k.characterClass(false, ['0', '1']), k.between(1, 53))),
)

/**
 * @since 1.0.0
 * @category Pattern
 */
const octalIntString: k.Pattern = pipe(
  k.exactString('0o'),
  k.then(pipe(k.characterClass(false, ['0', '7']), k.between(1, 18))),
)

/**
 * @since 1.0.0
 * @category Pattern
 */
const decimalIntString: k.Pattern = pipe(
  k.char('-'),
  k.maybe,
  k.then(pipe(k.digit, k.between(1, 16))),
)

/**
 * @since 1.0.0
 * @category Pattern
 */
const hexIntString: k.Pattern = pipe(
  k.exactString('0x'),
  k.then(pipe(k.hexDigit, k.between(1, 14))),
)

/**
 * @since 1.0.0
 * @category Pattern
 */
export const intFromString: k.Pattern = k.oneOf(
  binaryIntString,
  octalIntString,
  decimalIntString,
  hexIntString,
)

/**
 * Integer branded newtype from string. Parameters: min, max are inclusive.
 *
 * Note: has an optional `encodeToBase` parameter that controls the output base of the
 * encoded string. Currently only decodes binary, octal, decimal, and hexadecimal input
 * bases. It decodes in any base, and encodes to supplied parameter defaulting to decimal.
 *
 * _Note_: Does not currently allow exponential notation (e.g. `0x123e4`).
 *
 * Represents string-integers:
 *
 * ```math
 *  { z | z ∈ ℤ, z >= -2 ** 53 + 1, z <= 2 ** 53 - 1 }
 * ```
 *
 * @deprecated Use `ParseInt` instead.
 * @since 1.0.0
 * @category Conversion
 */
export const IntFromString: Schema<IntString, Integer> = pipe(
  Pattern(intFromString, ['IntString', PrimitivesTypeString.int()[1]]),
  Brand<IntStringBrand<MinSafeInt, MaxSafeInt>>(),
  Imap(
    PrimitivesGuard.int(),
    s => Number(s) as Integer,
    n => n.toString() as IntString,
  ),
)
