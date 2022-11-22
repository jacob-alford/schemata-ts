/**
 * Adds a character to the right or left of a string until it reaches a certain length.
 *
 * @since 1.0.0
 */
import * as SC from '../../../SchemaExt'
import { URI as SchemaURI } from '../../../base/SchemaBase'
import { WithPadding2 } from '../definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Schema: WithPadding2<SchemaURI> = {
  padLeft: (modulus, char) => sS => SC.make(S => S.padLeft(modulus, char)(sS(S))),
  padRight: (modulus, char) => sS => SC.make(S => S.padRight(modulus, char)(sS(S))),
}
