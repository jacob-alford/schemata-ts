import * as O from 'fp-ts/Option'
import * as G from 'schemata-ts/Guard'
import { WithOption } from 'schemata-ts/schemables/WithOption/definition'

export const WithOptionGuard: WithOption<G.SchemableLambda> = {
  optionFromExclude: (_, guardA) => ({
    is: (u): u is O.Option<typeof _> =>
      typeof u === 'object' &&
      u !== null &&
      !Array.isArray(u) &&
      '_tag' in u &&
      (u._tag === 'None' || (u._tag === 'Some' && 'value' in u && guardA.is(u.value))),
  }),
}
