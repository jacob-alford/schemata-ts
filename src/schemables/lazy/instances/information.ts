import * as Inf from 'schemata-ts/internal/information'
import { type WithLazy } from 'schemata-ts/schemables/lazy/definition'

export const LazyInformation: WithLazy<Inf.SchemableLambda> = {
  lazy: () => Inf.makeInformation(Number.MAX_VALUE),
}
