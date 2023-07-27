import type * as JS from 'schemata-ts/internal/json-schema'
import { type WithClone } from 'schemata-ts/schemables/clone/definition'
import { structuralClone } from 'schemata-ts/schemables/clone/utils'

export const CloneJsonSchema: WithClone<JS.SchemableLambda> = structuralClone()
