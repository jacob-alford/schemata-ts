/**
 * Adds a character to the right or left of a string until it reaches a certain length.
 *
 * @since 1.0.0
 */
import * as Eq_ from 'fp-ts/Eq'
import { identity } from 'fp-ts/function'
import { WithPadding1 } from 'schemata-ts/schemables/WithPadding/definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Eq: WithPadding1<Eq_.URI> = {
  padLeft: () => identity,
  padRight: () => identity,
}
