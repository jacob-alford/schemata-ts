import { flow } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as Eq from 'schemata-ts/Eq'
import * as P from 'schemata-ts/Printer'
import { WithOption } from 'schemata-ts/schemables/option/definition'

export const WithOptionPrinter: WithOption<P.SchemableLambda> = {
  optionFromExclude: (exclude, sa, eq = Eq.eqStrict) => ({
    domainToJson: flow(
      O.getOrElseW(() => exclude),
      sa.domainToJson,
    ),
    codomainToJson: eb =>
      eq.equals(eb, exclude) ? sa.domainToJson(exclude) : sa.codomainToJson(eb as any),
  }),
}
