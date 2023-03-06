/**
 * Invariant mapping for schemable
 *
 * @since 1.2.0
 */
import { identity } from 'fp-ts/function'
import * as JS from 'schemata-ts/JsonSchema'
import { WithInvariant } from 'schemata-ts/schemables/WithInvariant/definition'

/**
 * @since 1.2.0
 * @category Instances
 */
export const JsonSchema: WithInvariant<JS.SchemableLambda> = {
  imap: () => () => identity,
}
