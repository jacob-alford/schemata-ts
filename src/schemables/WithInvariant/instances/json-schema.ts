/**
 * Invariant mapping for schemable
 *
 * @since 1.2.0
 */
import { identity } from 'fp-ts/function'

import * as JS from '../../../base/JsonSchemaBase'
import { WithInvariant2 } from '../definition'

/**
 * @since 1.2.0
 * @category Instances
 */
export const JsonSchema: WithInvariant2<JS.URI> = {
  imap: () => () => identity,
}
