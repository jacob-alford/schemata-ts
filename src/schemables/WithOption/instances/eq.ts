import { flow, SK } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as Eq_ from 'schemata-ts/Eq'
import { WithOption } from 'schemata-ts/schemables/WithOption/definition'

export const WithOptionEq: WithOption<Eq_.SchemableLambda> = {
  optionFromExclude: flow(SK, O.getEq),
}
