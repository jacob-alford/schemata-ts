import type * as G from 'schemata-ts/internal/guard'
import { type WithClone } from 'schemata-ts/schemables/clone/definition'
import { structuralClone } from 'schemata-ts/schemables/clone/utils'

export const CloneGuard: WithClone<G.SchemableLambda> = structuralClone()
