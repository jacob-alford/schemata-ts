/** @since 1.1.0 */
import * as P from 'schemata-ts/base/PrinterBase'
import { WithUnknownContainers2 } from 'schemata-ts/schemables/WithUnknownContainers/definition'

/**
 * @since 1.1.0
 * @category Instances
 */
export const Printer: WithUnknownContainers2<P.URI> = {
  UnknownArray: P.UnknownArray,
  UnknownRecord: P.UnknownRecord,
}
