/**
 * Represents bigints converted from strings
 *
 * @since 1.0.0
 */
import * as PB from '../../PatternBuilder'
import * as O from 'fp-ts/Option'
import * as Str from 'fp-ts/string'
import { SchemaExt, make } from '../../SchemaExt'
import { flow, pipe } from 'fp-ts/function'

/**
 * Controls the output base of the encoded string. Currently only accepts 2, 8, 10, and
 * 16. It does not decode in this specified base, and accepts any base as input: 2, 8, 10, or 16.
 *
 * @since 1.0.0
 */
export type BigIntFromStringParams = {
  readonly encodeToBase?: 2 | 8 | 10 | 16
}

/**
 * @since 1.0.0
 * @category Model
 */
export type BigIntFromStringS = (
  params?: BigIntFromStringParams,
) => SchemaExt<string, bigint>

/**
 * @since 1.0.0
 * @category Pattern
 */
const binaryBigIntString: PB.Pattern = pipe(
  PB.exactString('0b'),
  PB.then(pipe(PB.characterClass(false, ['0', '1']), PB.atLeastOne())),
)

/**
 * @since 1.0.0
 * @category Pattern
 */
const octalBigIntString: PB.Pattern = pipe(
  PB.exactString('0o'),
  PB.then(pipe(PB.characterClass(false, ['0', '7']), PB.atLeastOne())),
)

/**
 * @since 1.0.0
 * @category Pattern
 */
const decimalBigIntString: PB.Pattern = pipe(
  PB.char('-'),
  PB.maybe,
  PB.then(pipe(PB.digit, PB.atLeastOne())),
)

/**
 * @since 1.0.0
 * @category Pattern
 */
const hexBigIntString: PB.Pattern = pipe(
  PB.exactString('0x'),
  PB.then(pipe(PB.hexDigit, PB.atLeastOne())),
)

/**
 * @since 1.0.0
 * @category Pattern
 */
export const bigIntString: PB.Pattern = PB.oneOf(
  binaryBigIntString,
  octalBigIntString,
  decimalBigIntString,
  hexBigIntString,
)

/** @internal */
const baseToPrefix = (base: BigIntFromStringParams['encodeToBase']): string => {
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
 * Represents bigints converted from strings
 *
 * @since 1.0.0
 */
export const BigIntFromString: BigIntFromStringS = (params = {}) =>
  make(S =>
    pipe(
      S.pattern(bigIntString, 'BigIntFromString'),
      S.refine(
        (s): s is string =>
          pipe(
            s,
            O.fromPredicate(flow(Str.trim, s => s.length > 0)),
            O.chain(O.tryCatchK(s => BigInt(s))),
            O.isSome,
          ),
        'SafeBigIntString',
      ),
      S.imap({ is: (b): b is bigint => typeof b === 'bigint' }, 'BigIntFromString')(
        (s: string) => BigInt(s),
        (n: bigint) =>
          `${baseToPrefix(params.encodeToBase)}${n.toString(params.encodeToBase ?? 10)}`,
      ),
    ),
  )
