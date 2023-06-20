import type * as TC from 'schemata-ts/internal/transcoder'
import { type WithClone } from 'schemata-ts/schemables/clone/definition'
import { structuralClone } from 'schemata-ts/schemables/clone/utils'

export const CloneTranscoder: WithClone<TC.SchemableLambda> = structuralClone()
