/**
 * Schemable for constructing a string with a check digit (e.g. ISBN or Credit Card)
 *
 * @since 1.2.0
 */
import { identity } from 'fp-ts/function'
import * as JS from 'schemata-ts/JsonSchema'
import { WithCheckDigit } from 'schemata-ts/schemables/WithCheckDigit/definition'

/**
 * @since 1.2.0
 * @category Instances
 */
export const JsonSchema: WithCheckDigit<JS.SchemableLambda> = {
  checkDigit: () => identity,
}
