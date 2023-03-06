/**
 * Adds a character to the right or left of a string until it reaches a certain length.
 *
 * @since 1.0.0
 */
import { identity } from 'fp-ts/function'
import * as Eq_ from 'schemata-ts/Eq'
import { WithPadding } from 'schemata-ts/schemables/WithPadding/definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Eq: WithPadding<Eq_.SchemableLambda> = {
  padLeft: () => identity,
  padRight: () => identity,
}
