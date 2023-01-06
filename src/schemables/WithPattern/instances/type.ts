/**
 * Schemable construction based on Regex combinators
 *
 * @since 1.0.0
 */
import { pipe } from 'fp-ts/function'
import * as t from 'schemata-ts/base/TypeBase'
import { WithPattern1 } from 'schemata-ts/schemables/WithPattern/definition'
import { pattern } from 'schemata-ts/schemables/WithPattern/utils'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Type: WithPattern1<t.URI> = {
  pattern: (p, desc, caseInsensitive) =>
    pipe(t.string, t.refine<string, string>(pattern(p, desc, caseInsensitive).is, desc)),
}
