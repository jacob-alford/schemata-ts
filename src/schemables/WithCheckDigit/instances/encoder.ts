/**
 * Schemable for constructing a string with a check digit (e.g. ISBN or Credit Card)
 *
 * @since 1.0.0
 */
import { identity } from 'fp-ts/function'
import * as Enc from 'schemata-ts/Encoder'
import { WithCheckDigit } from 'schemata-ts/schemables/WithCheckDigit/definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Encoder: WithCheckDigit<Enc.SchemableLambda> = {
  checkDigit: () => identity,
}
