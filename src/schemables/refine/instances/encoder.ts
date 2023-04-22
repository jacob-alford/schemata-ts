import { identity } from 'fp-ts/function'
import * as Enc from 'schemata-ts/Encoder'
import { WithRefine } from 'schemata-ts/schemables/refine/definition'

export const WithRefineEncoder: WithRefine<Enc.SchemableLambda> = {
  refine: () => identity,
}
