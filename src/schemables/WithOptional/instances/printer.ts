/**
 * Schemable for widening a type to include undefined. Similar to nullable but for undefined.
 *
 * @since 1.1.0
 */
import * as E from 'fp-ts/Either'
import * as P from 'schemata-ts/base/PrinterBase'
import { WithOptional2 } from 'schemata-ts/schemables/WithOptional/definition'

/**
 * @since 1.1.0
 * @category Instances
 */
export const Printer: WithOptional2<P.URI> = {
  optional: ea => ({
    domainToJson: a => (a === undefined ? E.right(undefined) : ea.domainToJson(a)),
    codomainToJson: e => (e === undefined ? E.right(undefined) : ea.codomainToJson(e)),
  }),
}
