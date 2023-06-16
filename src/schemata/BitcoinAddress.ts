/**
 * Represents strings which are valid Bitcoin addresses.
 *
 * @since 1.0.0
 */
import { pipe } from 'fp-ts/function'
import { Branded } from 'schemata-ts/brand'
import * as PB from 'schemata-ts/PatternBuilder'
import { Schema } from 'schemata-ts/Schema'
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
  PB.exactString('bc1'),
  PB.then(pipe(PB.characterClass(false, ['a', 'z'], ['0', '9']), PB.between(25, 39))),
)

/**
 * /^(1|3)[A-HJ-NP-Za-km-z1-9]{25,39}$/
 *
 * @internal
 */
const base58 = pipe(
  PB.subgroup(PB.characterClass(false, ['1', '3'])),
  PB.then(
    pipe(
      PB.characterClass(
        false,
        ['A', 'H'],
        ['J', 'N'],
        ['P', 'Z'],
        ['a', 'k'],
        ['m', 'z'],
        ['1', '9'],
      ),
      PB.between(25, 39),
    ),
  ),
)

/**
 * @since 1.0.0
 * @category Pattern
 */
export const bitcoinAddress: PB.Pattern = pipe(bech32, PB.or(base58))

/**
 * Represents strings which are valid Bitcoin addresses.
 *
 * @since 1.0.0
 * @category Schema
 */
export const BitcoinAddress: Schema<BitcoinAddress, BitcoinAddress> =
  Brand<BitcoinAddressBrand>()(Pattern(bitcoinAddress, 'BitcoinAddress'))
