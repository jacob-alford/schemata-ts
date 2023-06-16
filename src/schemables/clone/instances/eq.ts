import * as Eq from 'schemata-ts/internal/eq'
import { WithClone } from 'schemata-ts/schemables/clone/definition'
import { structuralClone } from 'schemata-ts/schemables/clone/utils'

export const CloneEq: WithClone<Eq.SchemableLambda> = structuralClone()
