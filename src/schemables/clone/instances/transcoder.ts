import * as TC from 'schemata-ts/internal/transcoder'
import { WithClone } from 'schemata-ts/schemables/clone/definition'
import { structuralClone } from 'schemata-ts/schemables/clone/utils'

export const CloneTranscoder: WithClone<TC.SchemableLambda> = structuralClone()
