/**
 * Schemable construction based on Regex combinators
 *
 * @since 1.1.0
 */
import * as E from 'fp-ts/Either'

import * as P from '../../../base/PrinterBase'
import * as PB from '../../../PatternBuilder'
import * as PE from '../../../PrintingError'
import { WithPattern2 } from '../definition'

/**
 * @since 1.1.0
 * @category Instances
 */
export const Printer: WithPattern2<P.URI> = {
  pattern: (pattern, description, caseSensitive) => ({
    print: E.fromPredicate(
      (value): value is string => PB.regexFromPattern(pattern, caseSensitive).test(value),
      value => new PE.NamedError(description, new PE.InvalidValue(value)),
    ),
    printLeft: P.string.printLeft,
  }),
}
