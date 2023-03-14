/** @since 1.1.0 */
import * as E from 'fp-ts/Either'
import * as P from 'schemata-ts/Printer'
import * as PE from 'schemata-ts/PrintError'
import { WithRefine } from 'schemata-ts/schemables/WithRefine/definition'

/**
 * @since 1.1.0
 * @category Instances
 */
export const Printer: WithRefine<P.SchemableLambda> = {
  refine: (f, id) => pa => ({
    domainToJson: a =>
      f(a) ? pa.domainToJson(a) : E.left(new PE.NamedError(id, new PE.InvalidValue(a))),
    codomainToJson: pa.codomainToJson,
  }),
}
