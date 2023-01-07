/**
 * Schemable construction based on Regex combinators
 *
 * @since 1.1.0
 */
import * as E from 'fp-ts/Either'
import * as P from 'schemata-ts/base/PrinterBase'
import * as PB from 'schemata-ts/PatternBuilder'
import * as PE from 'schemata-ts/PrintError'
import { WithPattern2 } from 'schemata-ts/schemables/WithPattern/definition'

/**
 * @since 1.1.0
 * @category Instances
 */
export const Printer: WithPattern2<P.URI> = {
  pattern: (pattern, description, caseSensitive) => ({
    domainToJson: E.fromPredicate(
      (value): value is string => PB.regexFromPattern(pattern, caseSensitive).test(value),
      value => new PE.NamedError(description, new PE.InvalidValue(value)),
    ),
    codomainToJson: P.string.codomainToJson,
  }),
}
