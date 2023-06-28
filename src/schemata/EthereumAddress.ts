/** @since 1.0.0 */
import * as k from 'kuvio'
import { type Branded } from 'schemata-ts/brand'
import { type Schema } from 'schemata-ts/Schema'
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
export const ethereumAddress: k.Pattern = k.sequence(
  k.subgroup(k.exactString('0x')),
  k.exactly(40)(k.xdigit),
)

/**
 * Represents strings which are valid Ethereum addresses.
 *
 * @since 1.0.0
 * @category String
 */
export const EthereumAddress: Schema<EthereumAddress> = Brand<EthereumAddressBrand>()(
  Pattern(ethereumAddress, 'EthereumAddress'),
)
