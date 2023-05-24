import * as RA from 'fp-ts/ReadonlyArray'
import * as Eq from 'schemata-ts/internal/eq'
import { WithArray } from 'schemata-ts/schemables/array/definition'

export const ArrayEq: WithArray<Eq.SchemableLambda> = {
  array: () => RA.getEq,
  tuple: (...eqs) =>
    Eq.fromEquals((a, b) => {
      for (let i = 0; i < eqs.length; ++i) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        if (!eqs[i]!.equals(a[i], b[i])) {
          return false
        }
      }
      return true
    }),
}
