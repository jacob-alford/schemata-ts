/** @since 1.0.0 */
import { pipe } from 'fp-ts/function'
import * as k from 'kuvio'
import { type Branded } from 'schemata-ts/brand'
import { type Schema } from 'schemata-ts/Schema'
import { Brand } from 'schemata-ts/schemata/Brand'
import { Pattern } from 'schemata-ts/schemata/Pattern'

interface AsciiBrand {
  readonly Ascii: unique symbol
}

/**
 * A string of ASCII characters.
 *
 * @since 1.0.0
 * @category Model
 */
export type Ascii = Branded<string, AsciiBrand>

/**
 * @since 1.0.0
 * @category Pattern
 */
export const ascii: k.Pattern = pipe(
  k.characterClass(false, [0x00, 0x7f]),
  k.atLeastOne(),
)

/**
 * A string of ASCII characters.
 *
 * @since 1.0.0
 * @category String
 */
export const Ascii: Schema<Ascii> = Brand<AsciiBrand>()(Pattern(ascii, 'Ascii'))
