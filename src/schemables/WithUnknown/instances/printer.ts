/**
 * Printer instance for WithUnknown
 *
 * @since 1.3.0
 */
import * as P from 'schemata-ts/Printer'
import { WithUnknown2 } from 'schemata-ts/schemables/WithUnknown/definition'

/**
 * @since 1.3.0
 * @category Instances
 */
export const Printer: WithUnknown2<P.URI> = {
  unknown: {
    domainToJson: P.toJson,
    codomainToJson: P.toJson,
  },
}
