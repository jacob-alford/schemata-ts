import * as E from 'fp-ts/Either'
import { flow } from 'fp-ts/function'
import * as P from 'schemata-ts/Printer'
import { WithJson } from 'schemata-ts/schemables/WithJson/definition'

export const WithJsonPrinter: WithJson<P.SchemableLambda> = {
  json: {
    domainToJson: E.right,
    codomainToJson: P.toJson,
  },
  jsonString: {
    domainToJson: flow(P.safeParse, E.right),
    codomainToJson: P.string.codomainToJson,
  },
}
