/**
 * A string of hexadecimal characters.
 *
 * @since 1.0.0
 */
import { pipe } from 'fp-ts/function'
import { Branded } from 'schemata-ts/brand'
import * as PB from 'schemata-ts/PatternBuilder'
import { Schema } from 'schemata-ts/Schema'
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
 * @since 1.0.0
 * @category Pattern
 */
export const hexadecimal: PB.Pattern = pipe(
  PB.exactString('0x'),
  PB.or(PB.exactString('0X')),
  PB.or(PB.exactString('0h')),
  PB.or(PB.exactString('0H')),
  PB.subgroup,
  PB.maybe,
  PB.then(
    pipe(PB.characterClass(false, ['0', '9'], ['A', 'F'], ['a', 'f']), PB.atLeastOne()),
  ),
)

/**
 * A string of hexadecimal characters.
 *
 * @since 1.0.0
 * @category Schema
 */
export const Hexadecimal: Schema<Hexadecimal> = Brand<HexadecimalBrand>()(
  Pattern(hexadecimal, 'Hexadecimal'),
)
