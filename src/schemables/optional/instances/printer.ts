import * as E from 'fp-ts/Either'
import * as P from 'schemata-ts/Printer'
import * as PE from 'schemata-ts/PrintError'
import { WithOptional } from 'schemata-ts/schemables/optional/definition'

export const WithOptionalPrinter: WithOptional<P.SchemableLambda> = {
  optional: ea => ({
    domainToJson: a => (a === undefined ? E.right(undefined) : ea.domainToJson(a)),
    codomainToJson: e => (e === undefined ? E.right(undefined) : ea.codomainToJson(e)),
  }),
}
