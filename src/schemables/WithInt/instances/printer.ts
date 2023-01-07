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
import * as P from 'schemata-ts/base/PrinterBase'
import { WithInt2 } from 'schemata-ts/schemables/WithInt/definition'

/**
 * @since 1.1.0
 * @category Instances
 */
export const Printer: WithInt2<P.URI> = {
  int: () => ({
    domainToJson: P.toJson,
    codomainToJson: P.number.codomainToJson,
  }),
}
