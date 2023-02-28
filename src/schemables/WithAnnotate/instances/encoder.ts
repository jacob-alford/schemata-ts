import { constant, identity } from 'fp-ts/function'
import * as Enc from 'schemata-ts/Encoder'
import { WithAnnotate } from 'schemata-ts/schemables/WithAnnotate/definition'

export const WithAnnotateEncoder: WithAnnotate<Enc.SchemableLambda> = {
  annotate: constant(identity),
}
