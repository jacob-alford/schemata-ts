import { constant, identity } from 'fp-ts/function'
import * as Arb from 'schemata-ts/Arbitrary'
import { WithAnnotate } from 'schemata-ts/schemables/WithAnnotate/definition'

export const WithAnnotateArbitrary: WithAnnotate<Arb.SchemableLambda> = {
  annotate: constant(identity),
}
