/** @since 1.0.0 */
import * as k from 'kuvio'
import { type Branded } from 'schemata-ts/brand'
import { type Schema } from 'schemata-ts/Schema'
import { Brand } from 'schemata-ts/schemata/Brand'
import { Pattern } from 'schemata-ts/schemata/Pattern'

interface HexadecimalBrand {
  readonly Hexadecimal: unique symbol
}

/**
 * A string of hexadecimal characters.
 *
 * @since 1.0.0
 * @category Model
 */
export type Hexadecimal = Branded<string, HexadecimalBrand>

/**
 * A string of hexadecimal characters.
 *
 * @since 1.0.0
 * @category String
 */
export const Hexadecimal: Schema<Hexadecimal> = Brand<HexadecimalBrand>()(
  Pattern(k.patterns.hexadecimal, 'Hexadecimal'),
)
