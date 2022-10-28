/**
 * A valid hexadecimal color value.
 *
 * @since 1.0.0
 */

import * as PB from '../../PatternBuilder'
import { make } from '../../SchemaExt'
import { Brand } from 'io-ts'
import { pipe } from 'fp-ts/function'

/** @internal */
type HexColorBrand = Brand<{ readonly HexColor: unique symbol }['HexColor']>

/**
 * A valid hexadecimal color value.
 *
 * @since 1.0.0
 * @category Model
 */
export type HexColor = string & HexColorBrand

/**
 * /^#?([0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6}|[0-9A-F]{8})$/i
 *
 * @since 1.0.0
 * @category Pattern
 */
export const hexColor: PB.Pattern = pipe(
  PB.maybe(PB.char('#')),
  PB.then(
    PB.subgroup(
      pipe(
        PB.characterClass(false, ['0', '9'], ['A', 'F']),
        PB.exactly(3),
        PB.or(pipe(PB.characterClass(false, ['0', '9'], ['A', 'F']), PB.exactly(4))),
        PB.or(pipe(PB.characterClass(false, ['0', '9'], ['A', 'F']), PB.exactly(6))),
        PB.or(pipe(PB.characterClass(false, ['0', '9'], ['A', 'F']), PB.exactly(8)))
      )
    )
  )
)

/**
 * @since 1.0.0
 * @category Schema
 */
export const HexColor = make(s =>
  s.brand<HexColorBrand>()(s.pattern(hexColor, 'HexColor', true))
)
