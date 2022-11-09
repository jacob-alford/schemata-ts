/**
 * A string of ASCII characters.
 *
 * @since 1.0.0
 */

import * as PB from '../../PatternBuilder'
import { make, SchemaExt } from '../../SchemaExt'
import { Brand } from 'io-ts'
import { pipe } from 'fp-ts/function'

/** @internal */
type AsciiBrand = Brand<{ readonly x: unique symbol }['x']>

/**
 * A string of ASCII characters.
 *
 * @since 1.0.0
 * @category Model
 */
export type Ascii = string & AsciiBrand

/**
 * @since 1.0.0
 * @category Model
 */
export type AsciiS = SchemaExt<string, Ascii>

/**
 * @since 1.0.0
 * @category Pattern
 */
export const ascii: PB.Pattern = pipe(
  PB.characterClass(false, [0x00, 0x7f]),
  PB.atLeastOne(),
)

/**
 * A string of ASCII characters.
 *
 * @since 1.0.0
 * @category Schema
 */
export const Ascii: AsciiS = make(s => s.brand<AsciiBrand>()(s.pattern(ascii, 'Ascii')))
