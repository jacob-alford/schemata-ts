/**
 * Encoder instance for WithUnknown
 *
 * @since 1.3.0
 */
import * as Enc from 'io-ts/Encoder'
import { WithUnknown2 } from 'schemata-ts/schemables/WithUnknown/definition'

/**
 * @since 1.3.0
 * @category Instances
 */
export const Encoder: WithUnknown2<Enc.URI> = {
  unknown: Enc.id(),
}
