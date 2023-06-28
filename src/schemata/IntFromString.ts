/** @since 1.0.0 */
import { pipe } from 'fp-ts/function'
import * as k from 'kuvio'
import { type Branded } from 'schemata-ts/brand'
import { type Integer, type MaxSafeInt, type MinSafeInt } from 'schemata-ts/integer'
import { type Schema } from 'schemata-ts/Schema'
import { type NumberParams } from 'schemata-ts/schemables/primitives/definition'
import { PrimitivesGuard } from 'schemata-ts/schemables/primitives/instances/guard'
import { Brand } from 'schemata-ts/schemata/Brand'
import { Imap } from 'schemata-ts/schemata/Imap'
import { Pattern } from 'schemata-ts/schemata/Pattern'
import { type Simplify } from 'type-fest'

type IntStringBrand<Min extends number, Max extends number> = {
  readonly IntString: unique symbol
  readonly Min: Min
  readonly Max: Max
}

/**
 * A string that can safely be parsed to a floating point number.
 *
 * @since 2.0.0
 */
export type IntString<
  Min extends number = MinSafeInt,
  Max extends number = MaxSafeInt,
> = Branded<string, IntStringBrand<Min, Max>>

/**
 * Controls the output base of the encoded string. Currently only accepts 2, 8, 10, and 16
 * due to constraints using `Number` as a parser. It does not decode in this specified
 * base, and accepts any base as input: 2, 8, 10, or 16.
 *
 * @since 1.0.0
 */
export type IntFromStringParams<
  Min extends number | undefined,
  Max extends number | undefined,
> = Simplify<
  {
    readonly encodeToBase?: 2 | 8 | 10 | 16
  } & NumberParams<Min, Max>
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

/** @internal */
const baseToPrefix = (base: IntFromStringParams<any, any>['encodeToBase']): string => {
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
 * @category Conversion
 */
export const IntFromString = <
  Min extends number | undefined,
  Max extends number | undefined,
>(
  params: IntFromStringParams<Min, Max> = {},
): Schema<
  IntString<
    Min extends undefined ? MinSafeInt : Min,
    Max extends undefined ? MaxSafeInt : Max
  >,
  Integer<
    Min extends undefined ? MinSafeInt : Min,
    Max extends undefined ? MaxSafeInt : Max
  >
> =>
  pipe(
    Pattern(intFromString, 'IntFromString'),
    Brand<
      IntStringBrand<
        Min extends undefined ? MinSafeInt : Min,
        Max extends undefined ? MaxSafeInt : Max
      >
    >(),
    Imap(
      PrimitivesGuard.int(params),
      s =>
        Number(s) as Integer<
          Min extends undefined ? MinSafeInt : Min,
          Max extends undefined ? MaxSafeInt : Max
        >,
      n =>
        `${baseToPrefix(params.encodeToBase)}${n.toString(
          params.encodeToBase ?? 10,
        )}` as IntString<
          Min extends undefined ? MinSafeInt : Min,
          Max extends undefined ? MaxSafeInt : Max
        >,
    ),
  )
