import * as Inf from 'schemata-ts/internal/information'
import { WithRefine } from 'schemata-ts/schemables/refine/definition'

export const RefineInformation: WithRefine<Inf.SchemableLambda> = {
  refine: () => inner => Inf.makeInformation(inner / 2),
}
