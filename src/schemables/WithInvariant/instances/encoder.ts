/**
 * Invariant mapping for schemable
 *
 * @since 1.0.0
 */
import { flow } from 'fp-ts/function'
import * as Enc from 'schemata-ts/Encoder'
import { WithInvariant } from 'schemata-ts/schemables/WithInvariant/definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Encoder: WithInvariant<Enc.SchemableLambda> = {
  imap: () => (_, reverseGet) => encA => ({
    encode: flow(reverseGet, encA.encode),
  }),
}
