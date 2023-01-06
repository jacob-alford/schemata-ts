/** @since 1.1.0 */
import * as P from 'schemata-ts/base/PrinterBase'
import { WithRefine2 } from 'schemata-ts/schemables/WithRefine/definition'

/**
 * @since 1.1.0
 * @category Instances
 */
export const Printer: WithRefine2<P.URI> = {
  refine: P.refine,
}
