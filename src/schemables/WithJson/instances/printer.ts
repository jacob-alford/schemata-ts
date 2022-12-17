/**
 * A basal schemable for Json and JsonString
 *
 * @since 1.0.2
 */
import * as E from 'fp-ts/Either'
import { flow } from 'fp-ts/function'
import * as J from 'fp-ts/Json'

import * as P from '../../../base/PrinterBase'
import * as PE from '../../../PrintingError'
import { WithJson2 } from '../definition'

/**
 * @since 1.0.2
 * @category Instances
 */
export const Printer: WithJson2<P.URI> = {
  json: {
    print: E.right,
    printLeft: E.right,
  },
  jsonString: {
    print: flow(
      J.parse,
      E.mapLeft(err => new PE.NamedError('Json String', new PE.UnknownError(err))),
    ),
    printLeft: P.string.printLeft,
  },
}
