import * as TCP from 'schemata-ts/internal/transcoder-par'
import { type WithInvariant } from 'schemata-ts/schemables/invariant/definition'

export const InvariantTranscoderPar: WithInvariant<TCP.SchemableLambda> = {
  imap: () => TCP.imap,
}
