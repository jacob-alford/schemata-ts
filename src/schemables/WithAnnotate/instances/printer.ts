import { constant, identity } from 'fp-ts/function'
import * as P from 'schemata-ts/Printer'
import { WithAnnotate } from 'schemata-ts/schemables/WithAnnotate/definition'

export const WithAnnotatePrinter: WithAnnotate<P.SchemableLambda> = {
  annotate: constant(identity),
}
