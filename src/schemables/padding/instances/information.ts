import * as Inf from 'schemata-ts/internal/information'
import { WithPadding } from 'schemata-ts/schemables/padding/definition'

export const PaddingInformation: WithPadding<Inf.SchemableLambda> = {
  padLeft: () => inner => Inf.makeInformation(inner / 2),
  padRight: () => inner => Inf.makeInformation(inner / 2),
}
