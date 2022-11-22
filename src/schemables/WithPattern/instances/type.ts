/**
 * Schemable construction based on Regex combinators
 *
 * @since 1.0.0
 */
import * as t from '../../../base/TypeBase'
import { WithPattern1 } from '../definition'
import { pattern } from '../utils'
import { pipe } from 'fp-ts/function'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Type: WithPattern1<t.URI> = {
  pattern: (p, desc, caseInsensitive) =>
    pipe(t.string, t.refine<string, string>(pattern(p, desc, caseInsensitive).is, desc)),
}
