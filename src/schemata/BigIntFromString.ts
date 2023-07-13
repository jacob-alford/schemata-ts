/** @since 1.0.0 */
import { flow, pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as Str from 'fp-ts/string'
import * as k from 'kuvio'
import { type Branded } from 'schemata-ts/brand'
import { type Schema } from 'schemata-ts/Schema'
import { Brand } from 'schemata-ts/schemata/Brand'
import { Imap } from 'schemata-ts/schemata/Imap'
import { Pattern } from 'schemata-ts/schemata/Pattern'
import { Refine } from 'schemata-ts/schemata/Refine'

type BigIntStringBrand = { readonly BigIntString: unique symbol }

/**
 * Represents strings that can be parsed properly by `BigInt()`
 *
 * @since 2.0.0
 */
export type BigIntString = Branded<string, BigIntStringBrand>

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
 * @category Pattern
 */
const binaryBigIntString: k.Pattern = pipe(
  k.exactString('0b'),
  k.then(pipe(k.characterClass(false, ['0', '1']), k.atLeastOne())),
)

/**
 * @since 1.0.0
 * @category Pattern
 */
const octalBigIntString: k.Pattern = pipe(
  k.exactString('0o'),
  k.then(pipe(k.characterClass(false, ['0', '7']), k.atLeastOne())),
)

/**
 * @since 1.0.0
 * @category Pattern
 */
const decimalBigIntString: k.Pattern = pipe(
  k.char('-'),
  k.maybe,
  k.then(pipe(k.digit, k.atLeastOne())),
)

/**
 * @since 1.0.0
 * @category Pattern
 */
const hexBigIntString: k.Pattern = pipe(
  k.exactString('0x'),
  k.then(pipe(k.hexDigit, k.atLeastOne())),
)

/**
 * @since 1.0.0
 * @category Pattern
 */
export const bigIntString: k.Pattern = k.oneOf(
  binaryBigIntString,
  octalBigIntString,
  decimalBigIntString,
  hexBigIntString,
)

/**
 * Represents bigints converted from strings
 *
 * @since 1.0.0
 * @category Conversion
 */
export const BigIntFromString: Schema<BigIntString, bigint> = pipe(
  Pattern(bigIntString, 'BigIntString'),
  Refine(
    (s): s is BigIntString =>
      pipe(
        s,
        O.fromPredicate(flow(Str.trim, s => s.length > 0)),
        O.chain(O.tryCatchK(s => BigInt(s))),
        O.isSome,
      ),
    'bigint',
  ),
  Brand<BigIntStringBrand>(),
  Imap(
    { is: (u): u is bigint => typeof u === 'bigint' },
    b => BigInt(b),
    n => n.toString() as BigIntString,
  ),
)
