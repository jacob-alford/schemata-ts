import { constant } from 'fp-ts/function'
import * as P from 'schemata-ts/Printer'
import { WithPrimitives } from 'schemata-ts/schemables/WithPrimitives/definition'

/** @since 2.0.0 */
export const Printer: WithPrimitives<P.SchemableLambda> = {
  string: constant({
    domainToJson: P.toJson,
    codomainToJson: P.toJson,
  }),
  int: constant({
    domainToJson: P.toJson,
    codomainToJson: P.toJson,
  }),
  float: constant({
    domainToJson: P.toJson,
    codomainToJson: P.toJson,
  }),
  boolean: {
    domainToJson: P.toJson,
    codomainToJson: P.toJson,
  },
  unknown: {
    domainToJson: P.toJson,
    codomainToJson: P.toJson,
  },
  literal: constant({
    domainToJson: P.toJson,
    codomainToJson: P.toJson,
  }),
}
