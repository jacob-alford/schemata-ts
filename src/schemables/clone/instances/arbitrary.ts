import type * as Arb from 'schemata-ts/internal/arbitrary'
import { type WithClone } from 'schemata-ts/schemables/clone/definition'
import { structuralClone } from 'schemata-ts/schemables/clone/utils'

export const CloneArbitrary: WithClone<Arb.SchemableLambda> = structuralClone()
