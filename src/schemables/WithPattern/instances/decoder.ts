/**
 * Schemable construction based on Regex combinators
 *
 * @since 1.0.0
 */
import { pipe } from 'fp-ts/function'
import * as D from 'schemata-ts/Decoder'
import { WithPattern } from 'schemata-ts/schemables/WithPattern/definition'
import { pattern } from 'schemata-ts/schemables/WithPattern/utils'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Decoder: WithPattern<D.SchemableLambda> = {
  pattern: (p, desc, caseInsensitive) =>
    pipe(
      pattern(p, desc, caseInsensitive),
      D.fromGuard(u => D.decodeErrors(D.typeMismatch(desc, u))),
    ),
}
