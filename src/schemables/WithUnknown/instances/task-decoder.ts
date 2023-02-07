/**
 * TaskDecoder instance for WithUnknown
 *
 * @since 1.3.0
 */
import * as TD from 'io-ts/TaskDecoder'
import { WithUnknown2C } from 'schemata-ts/schemables/WithUnknown/definition'
import { Decoder } from 'schemata-ts/schemables/WithUnknown/instances/decoder'

/**
 * @since 1.3.0
 * @category Instances
 */
export const TaskDecoder: WithUnknown2C<TD.URI, unknown> = {
  unknown: TD.fromDecoder(Decoder.unknown),
}
