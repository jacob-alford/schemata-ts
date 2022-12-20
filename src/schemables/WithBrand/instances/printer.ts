/**
 * Schemable for constructing a branded newtype
 *
 * @since 1.1.0
 */
import { identity } from 'fp-ts/function'

import * as P from '../../../base/PrinterBase'
import { WithBrand2 } from '../definition'

/**
 * @since 1.1.0
 * @category Instances
 */
export const Printer: WithBrand2<P.URI> = {
  brand: () => identity,
}
