import { constant, identity } from 'fp-ts/function'
import * as Arb from 'schemata-ts/internal/arbitrary'
import { WithAnnotate } from 'schemata-ts/schemables/annotate/definition'

export const AnnotateArbitrary: WithAnnotate<Arb.SchemableLambda> = {
  annotate: constant(identity),
}
