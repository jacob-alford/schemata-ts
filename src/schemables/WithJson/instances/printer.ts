/**
 * A basal schemable for Json and JsonString
 *
 * @since 1.1.0
 */
import * as E from 'fp-ts/Either'
import { flow } from 'fp-ts/function'

import * as P from '../../../base/PrinterBase'
import { WithJson2 } from '../definition'

/**
 * @since 1.1.0
 * @category Instances
 */
export const Printer: WithJson2<P.URI> = {
  json: {
    print: E.right,
    printLeft: P.toJson,
  },
  jsonString: {
    print: flow(P.safeParse, E.right),
    printLeft: P.string.printLeft,
  },
}
