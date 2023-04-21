import * as SC from 'schemata-ts/Schema'
import { WithOption } from 'schemata-ts/schemables/WithOption/definition'

export const WithOptionSchema: WithOption<Schem.SchemableLambda>['optionFromExclude'] = (
  exclude,
  schemaA,
  eq,
) => SC.make(S => S.optionFromExclude(exclude, schemaA(S), eq))
