/**
 * Integer branded newtype. Parameters: min, max are inclusive.
 *
 * Represents integers:
 *
 * ```math
 *  { z | z ∈ ℤ, z >= -2 ** 53 + 1, z <= 2 ** 53 - 1 }
 * ```
 *
 * @since 1.1.0
 */
import * as E from 'fp-ts/Either'

import * as P from '../../../base/PrinterBase'
import { WithInt2 } from '../definition'

/**
 * @since 1.1.0
 * @category Instances
 */
export const Printer: WithInt2<P.URI> = {
  int: () => ({
    print: E.right,
    printLeft: P.number.printLeft,
  }),
}
