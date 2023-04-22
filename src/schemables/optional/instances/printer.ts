import * as E from 'fp-ts/Either'
import * as P from 'schemata-ts/Printer'
import * as PE from 'schemata-ts/PrintError'
import { WithOptional } from 'schemata-ts/schemables/optional/definition'

export const OptionalPrinter: WithOptional<P.SchemableLambda> = {
  optional: ea => ({
    domainToJson: a =>
      a === undefined ? E.left(new PE.InvalidValue(a)) : ea.domainToJson(a),
    codomainToJson: e =>
      e === undefined ? E.left(new PE.InvalidValue(e)) : ea.codomainToJson(e),
  }),
}
