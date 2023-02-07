/**
 * Decoder instance for WithUnknown
 *
 * @since 1.3.0
 */
import * as D from 'io-ts/Decoder'
import { WithUnknown2C } from 'schemata-ts/schemables/WithUnknown/definition'

/**
 * @since 1.3.0
 * @category Instances
 */
export const Decoder: WithUnknown2C<D.URI, unknown> = {
  unknown: D.id(),
}
