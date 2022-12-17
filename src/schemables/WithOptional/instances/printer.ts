/**
 * Schemable for widening a type to include undefined. Similar to nullable but for undefined.
 *
 * @since 1.0.2
 */
import * as E from 'fp-ts/Either'

import * as P from '../../../base/PrinterBase'
import * as PE from '../../../PrintingError'
import { WithOptional2 } from '../definition'

/**
 * @since 1.0.2
 * @category Instances
 */
export const Printer: WithOptional2<P.URI> = {
  optional: ea => ({
    print: a => (a === undefined ? E.left(new PE.InvalidValue(a)) : ea.print(a)),
    printLeft: e => (e === undefined ? E.left(new PE.InvalidValue(e)) : ea.printLeft(e)),
  }),
}
