/**
 * Re-export of `WithUnknownContainers` from `io-ts/Schemable/WithUnknownContainers`
 *
 * @since 1.0.0
 */
import * as Enc from 'io-ts/Encoder'
import { WithUnknownContainers2 } from '../definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Encoder: WithUnknownContainers2<Enc.URI> = {
  UnknownArray: Enc.id(),
  UnknownRecord: Enc.id(),
}
