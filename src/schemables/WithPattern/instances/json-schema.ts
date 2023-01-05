/**
 * Schemable construction based on Regex combinators
 *
 * @since 1.2.0
 */
import { pipe } from 'fp-ts/function'

import * as JS from '../../../base/JsonSchemaBase'
import * as PB from '../../../PatternBuilder'
import { WithPattern2 } from '../definition'

/**
 * @since 1.2.0
 * @category Instances
 */
export const JsonSchema: WithPattern2<JS.URI> = {
  pattern: (pattern, description, caseInsensitive) =>
    pipe(
      JS.makeStringSchema({
        pattern: PB.regexFromPattern(pattern, caseInsensitive).source,
      }),
      JS.annotate({ description }),
    ),
}
