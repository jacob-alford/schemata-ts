import * as Inf from 'schemata-ts/internal/information'
import { type WithPattern } from 'schemata-ts/schemables/pattern/definition'

const patternInformation: Inf.Information<string> = Inf.makeInformation(27)

export const PatternInformation: WithPattern<Inf.SchemableLambda> = {
  pattern: () => patternInformation,
}
