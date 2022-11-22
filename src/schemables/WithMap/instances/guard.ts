/**
 * Represents a ReadonlyMap converted from an expected array of entries.
 *
 * @since 1.0.0
 */
import * as B from 'fp-ts/boolean'
import { pipe } from 'fp-ts/function'
import * as Ord from 'fp-ts/Ord'
import * as RM from 'fp-ts/ReadonlyMap'
import * as G from 'io-ts/Guard'

import { WithMap1 } from '../definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Guard: WithMap1<G.URI> = {
  mapFromEntries: <K, A>(
    ordK: Ord.Ord<K>,
    sk: G.Guard<unknown, K>,
    sa: G.Guard<unknown, A>,
  ) => ({
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
