import * as B from 'fp-ts/boolean'
import { pipe } from 'fp-ts/function'
import * as Ord from 'fp-ts/Ord'
import * as RM from 'fp-ts/ReadonlyMap'
import * as G from 'schemata-ts/internal/guard'
import { WithMap } from 'schemata-ts/schemables/map/definition'

export const WithMapGuard: WithMap<G.SchemableLambda> = {
  mapFromEntries: <K, A>(ordK: Ord.Ord<K>, sk: G.Guard<K>, sa: G.Guard<A>) => ({
    is: (a): a is ReadonlyMap<K, A> =>
      a instanceof Map &&
      pipe(
        a,
        RM.foldMapWithIndex(ordK)(B.MonoidAll)(
          (key, value) => sk.is(key) && sa.is(value),
        ),
      ),
  }),
}
