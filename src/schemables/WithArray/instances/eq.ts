import * as RA from 'fp-ts/ReadonlyArray'
import * as Eq_ from 'schemata-ts/Eq'
import { WithArray } from 'schemata-ts/schemables/WithArray/definition'

export const WithArrayEq: WithArray<Eq_.SchemableLambda> = {
  array: RA.getEq,
  tuple: (...eqs) =>
    Eq_.fromEquals((a, b) => {
      for (let i = 0; i < eqs.length; ++i) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        if (!eqs[i]!.equals(a[i], b[i])) {
          return false
        }
      }
      return true
    }),
}
