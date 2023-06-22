import { type SchemableLambda, makeTypeString } from 'schemata-ts/internal/type-string'
import { type WithInvariant } from 'schemata-ts/schemables/invariant/definition'

export const InvariantTypeString: WithInvariant<SchemableLambda> = {
  imap: (_, newName) => () => oldName =>
    makeTypeString(newName !== undefined ? [oldName[0], newName] : oldName),
}
