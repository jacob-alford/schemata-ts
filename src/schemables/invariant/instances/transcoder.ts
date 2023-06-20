import * as TC from 'schemata-ts/internal/transcoder'
import { type WithInvariant } from 'schemata-ts/schemables/invariant/definition'

export const InvariantTranscoder: WithInvariant<TC.SchemableLambda> = {
  imap: () => TC.imap,
}
