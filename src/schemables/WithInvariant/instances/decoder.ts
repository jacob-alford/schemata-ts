/**
 * Invariant mapping for schemable
 *
 * @since 1.0.0
 */
import * as E from 'fp-ts/Either'
import { flow } from 'fp-ts/function'
import * as D from 'schemata-ts/Decoder'
import { WithInvariant } from 'schemata-ts/schemables/WithInvariant/definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Decoder: WithInvariant<D.SchemableLambda> = {
  imap: () => get => dA => ({
    decode: flow(dA.decode, E.map(get)),
  }),
}
