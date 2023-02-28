import { constant, identity } from 'fp-ts/function'
import * as PD from 'schemata-ts/internal/parallel-decoder'
import { WithAnnotate } from 'schemata-ts/schemables/WithAnnotate/definition'

export const WithAnnotateParallelDecoder: WithAnnotate<PD.SchemableLambda> = {
  annotate: constant(identity),
}
