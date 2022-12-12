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
 * @since 1.0.0
 */
import { pipe } from 'fp-ts/function'

import * as PB from '../../PatternBuilder'
import * as Int from '../../schemables/WithInt/definition'
import { Guard } from '../../schemables/WithInt/instances/guard'
import { make, SchemaExt } from '../../SchemaExt'

/**
 * Controls the output base of the encoded string. Currently only accepts 2, 8, 10, and 16
 * due to constraints using `Number` as a parser. It does not decode in this specified
 * base, and accepts any base as input: 2, 8, 10, or 16.
 *
 * @since 1.0.0
 */
export type IntFromStringParams = {
  readonly encodeToBase?: 2 | 8 | 10 | 16
}

/**
 * @since 1.0.0
 * @category Model
 */
export type IntFromStringS = (
  params?: Int.IntParams & IntFromStringParams,
) => SchemaExt<string, Int.Int>

/**
 * @since 1.0.0
 * @category Pattern
 */
const binaryIntString: PB.Pattern = pipe(
  PB.exactString('0b'),
  PB.then(pipe(PB.characterClass(false, ['0', '1']), PB.between(1, 53))),
)

/**
 * @since 1.0.0
 * @category Pattern
 */
const octalIntString: PB.Pattern = pipe(
  PB.exactString('0o'),
  PB.then(pipe(PB.characterClass(false, ['0', '7']), PB.between(1, 18))),
)

/**
 * @since 1.0.0
 * @category Pattern
 */
const decimalIntString: PB.Pattern = pipe(
  PB.char('-'),
  PB.maybe,
  PB.then(pipe(PB.digit, PB.between(1, 16))),
)

/**
 * @since 1.0.0
 * @category Pattern
 */
const hexIntString: PB.Pattern = pipe(
  PB.exactString('0x'),
  PB.then(pipe(PB.hexDigit, PB.between(1, 14))),
)

/**
 * @since 1.0.0
 * @category Pattern
 */
export const intFromString: PB.Pattern = PB.oneOf(
  binaryIntString,
  octalIntString,
  decimalIntString,
  hexIntString,
)

/** @internal */
const baseToPrefix = (base: IntFromStringParams['encodeToBase']): string => {
  switch (base) {
    case 2:
      return `0b`
    case 8:
      return `0o`
    case 16:
      return `0x`
    default:
      return ''
  }
}

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
 * @since 1.0.0
 * @category Schema
 */
export const IntFromString: IntFromStringS = (params = {}) =>
  make(S =>
    pipe(
      S.pattern(intFromString, 'IntFromString'),
      S.imap(Guard.int(params), 'IntFromString')(
        (s: string) => Number(s) as Int.Int,
        (n: Int.Int) =>
          `${baseToPrefix(params.encodeToBase)}${n.toString(params.encodeToBase ?? 10)}`,
      ),
    ),
  )
