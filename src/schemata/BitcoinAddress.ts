/** @since 1.0.0 */
import { pipe } from 'fp-ts/function'
import * as k from 'kuvio'
import { type Branded } from 'schemata-ts/brand'
import { type Schema } from 'schemata-ts/Schema'
import { Brand } from 'schemata-ts/schemata/Brand'
import { Pattern } from 'schemata-ts/schemata/Pattern'

interface BitcoinAddressBrand {
  readonly BitcoinAddress: unique symbol
}

/**
 * Represents strings which are valid Bitcoin addresses.
 *
 * @since 1.0.0
 * @category Model
 */
export type BitcoinAddress = Branded<string, BitcoinAddressBrand>

/**
 * /^(bc1)[a-z0-9]{25,39}$/
 *
 * @internal
 */
const bech32 = pipe(
  k.exactString('bc1'),
  k.andThen(pipe(k.characterClass(false, ['a', 'z'], ['0', '9']), k.between(25, 39))),
)

/**
 * /^(1|3)[A-HJ-NP-Za-km-z1-9]{25,39}$/
 *
 * @internal
 */
const base58 = pipe(
  k.subgroup(k.characterClass(false, ['1', '3'])),
  k.andThen(
    pipe(
      k.characterClass(
        false,
        ['A', 'H'],
        ['J', 'N'],
        ['P', 'Z'],
        ['a', 'k'],
        ['m', 'z'],
        ['1', '9'],
      ),
      k.between(25, 39),
    ),
  ),
)

/**
 * @since 1.0.0
 * @category Pattern
 */
export const bitcoinAddress: k.Pattern = pipe(bech32, k.or(base58))

/**
 * Represents strings which are valid Bitcoin addresses.
 *
 * @since 1.0.0
 * @category String
 */
export const BitcoinAddress: Schema<BitcoinAddress> = Brand<BitcoinAddressBrand>()(
  Pattern(bitcoinAddress, 'BitcoinAddress'),
)
