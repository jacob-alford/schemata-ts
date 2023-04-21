import * as TC from 'schemata-ts/internal/Transcoder'
import { WithInvariant } from 'schemata-ts/schemables/WithInvariant/definition'

export const WithInvariantTranscoder: WithInvariant<TC.SchemableLambda> = {
  imap: () => D.map,
}
