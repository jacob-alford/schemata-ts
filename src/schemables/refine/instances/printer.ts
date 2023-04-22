/** @since 1.1.0 */
import * as E from 'fp-ts/Either'
import * as P from 'schemata-ts/Printer'
import * as PE from 'schemata-ts/PrintError'
import { WithRefine } from 'schemata-ts/schemables/refine/definition'

export const WithRefinePrinter: WithRefine<P.SchemableLambda> = {
  refine: (f, id) => pa => ({
    domainToJson: a =>
      f(a) ? pa.domainToJson(a) : E.left(new PE.NamedError(id, new PE.InvalidValue(a))),
    codomainToJson: pa.codomainToJson,
  }),
}
