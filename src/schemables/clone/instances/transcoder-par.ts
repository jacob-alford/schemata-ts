import type * as TCP from 'schemata-ts/internal/transcoder-par'
import { type WithClone } from 'schemata-ts/schemables/clone/definition'
import { structuralClone } from 'schemata-ts/schemables/clone/utils'

export const CloneTranscoderPar: WithClone<TCP.SchemableLambda> = structuralClone()
