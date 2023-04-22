import * as SC from 'schemata-ts/Schema'
import { WithOption } from 'schemata-ts/schemables/option/definition'

export const OptionSchema: WithOption<Schem.SchemableLambda>['optionFromExclude'] = (
  exclude,
  schemaA,
  eq,
) => SC.make(S => S.optionFromExclude(exclude, schemaA(S), eq))
