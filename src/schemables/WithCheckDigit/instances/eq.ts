/**
 * Schemable for constructing a string with a check digit (e.g. ISBN or Credit Card)
 *
 * @since 1.0.0
 */
import { identity } from 'fp-ts/function'
import * as Eq_ from 'schemata-ts/Eq'
import { WithCheckDigit } from 'schemata-ts/schemables/WithCheckDigit/definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Eq: WithCheckDigit<Eq_.SchemableLambda> = {
  checkDigit: () => identity,
}
