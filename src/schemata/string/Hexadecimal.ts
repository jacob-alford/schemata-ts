/**
 * A string of hexadecimal characters.
 *
 * @since 1.0.0
 */
import { pipe } from 'fp-ts/function'
import * as PB from '../../PatternBuilder'
import { make } from '../../SchemaExt'
import { Brand } from 'io-ts'

/** @internal */
type HexadecimalBrand = Brand<{ readonly x: unique symbol }['x']>

/**
 * A string of hexadecimal characters.
 *
 * @since 1.0.0
 * @category Model
 */
export type Hexadecimal = string & HexadecimalBrand

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
    pipe(PB.characterClass(false, ['0', '9'], ['A', 'F'], ['a', 'f']), PB.atLeastOne())
  )
)

/**
 * @since 1.0.0
 * @category Schema
 */
export const Hexadecimal = make(s =>
  s.brand<HexadecimalBrand>()(s.pattern(hexadecimal, 'Hexadecimal'))
)
