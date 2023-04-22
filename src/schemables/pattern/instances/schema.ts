import * as SC from 'schemata-ts/Schema'
import { WithPattern } from 'schemata-ts/schemables/pattern/definition'

export const PatternSchema: WithPattern<Schem.SchemableLambda>['pattern'] = (
  pattern,
  description,
) => SC.make(S => S.pattern(pattern, description))
