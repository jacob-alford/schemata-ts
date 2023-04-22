import * as TC from 'schemata-ts/internal/transcoder'
import { WithInvariant } from 'schemata-ts/schemables/invariant/definition'

export const WithInvariantTranscoder: WithInvariant<TC.SchemableLambda> = {
  imap: () => TC.imap,
}
