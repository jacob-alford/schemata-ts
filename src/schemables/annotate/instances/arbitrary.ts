import { constant, identity } from 'fp-ts/function'
import type * as Arb from 'schemata-ts/internal/arbitrary'
import { type WithAnnotate } from 'schemata-ts/schemables/annotate/definition'

export const AnnotateArbitrary: WithAnnotate<Arb.SchemableLambda> = {
  annotate: constant(identity),
}
