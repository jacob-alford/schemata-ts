/**
 * Represents strings which are valid Ethereum addresses.
 *
 * @since 1.0.0
 */
import { Branded } from 'schemata-ts/brand'
import * as PB from 'schemata-ts/PatternBuilder'
import { Schema } from 'schemata-ts/Schema'
import { Brand } from 'schemata-ts/schemata/Brand'
import { Pattern } from 'schemata-ts/schemata/Pattern'

interface EthereumAddressBrand {
  readonly EthereumAddress: unique symbol
}

/**
 * Represents strings which are valid Ethereum addresses.
 *
 * @since 1.0.0
 * @category Model
 */
export type EthereumAddress = Branded<string, EthereumAddressBrand>

/**
 * @since 1.0.0
 * @category Pattern
 */
export const ethereumAddress: PB.Pattern = PB.sequence(
  PB.subgroup(PB.exactString('0x')),
  PB.exactly(40)(PB.xdigit),
)

/**
 * Represents strings which are valid Ethereum addresses.
 *
 * @since 1.0.0
 * @category Schema
 */
export const EthereumAddress: Schema<EthereumAddress, EthereumAddress> =
  Brand<EthereumAddressBrand>()(Pattern(ethereumAddress, 'EthereumAddress'))
