/**
 * Type instance for WithUnknown
 *
 * @since 1.3.0
 */
import * as t_ from 'io-ts'
import * as t from 'io-ts/Type'
import { WithUnknown1 } from 'schemata-ts/schemables/WithUnknown/definition'

/**
 * @deprecated
 * @since 1.3.0
 * @category Instances
 */
export const Type: WithUnknown1<t.URI> = {
  unknown: t_.unknown,
}
