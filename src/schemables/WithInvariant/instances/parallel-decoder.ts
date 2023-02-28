import * as PD from 'schemata-ts/internal/parallel-decoder'
import { WithInvariant } from 'schemata-ts/schemables/WithInvariant/definition'

export const WithInvariantParallelDecoder: WithInvariant<PD.SchemableLambda> = {
  imap: () => PD.map,
}
