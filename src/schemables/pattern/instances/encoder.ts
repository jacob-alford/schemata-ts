import * as Enc from 'schemata-ts/Encoder'
import { WithPattern } from 'schemata-ts/schemables/pattern/definition'

export const PatternEncoder: WithPattern<Enc.SchemableLambda> = {
  pattern: () => Enc.id(),
}
