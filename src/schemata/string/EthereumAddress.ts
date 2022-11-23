/**
 * Represents strings which are valid Ethereum addresses.
 *
 * @since 1.0.0
 */
import { Branded } from 'io-ts'

import * as PB from '../../PatternBuilder'
import { make, SchemaExt } from '../../SchemaExt'

/** @internal */
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
export type EthereumAddressS = SchemaExt<string, EthereumAddress>

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
export const EthereumAddress: EthereumAddressS = make(s =>
  s.brand<EthereumAddressBrand>()(s.pattern(ethereumAddress, 'EthereumAddress')),
)
