import { constant, identity } from 'fp-ts/function'
import * as Eq_ from 'schemata-ts/Eq'
import { WithAnnotate } from 'schemata-ts/schemables/annotate/definition'

export const WithAnnotateEq: WithAnnotate<Eq_.SchemableLambda> = {
  annotate: constant(identity),
}
