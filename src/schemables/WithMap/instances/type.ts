/**
 * Represents a ReadonlyMap converted from an expected array of entries.
 *
 * @since 1.0.0
 */
import * as E from 'fp-ts/Either'
import { flow } from 'fp-ts/function'
import * as Ord from 'fp-ts/Ord'
import * as RA from 'fp-ts/ReadonlyArray'
import * as RM from 'fp-ts/ReadonlyMap'
import * as Sg from 'fp-ts/Semigroup'
import { Type as Type_ } from 'io-ts'
import * as t from 'io-ts/Type'

import { WithMap1 } from '../definition'
import { Encoder } from './encoder'
import { Guard } from './guard'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Type: WithMap1<t.URI> = {
  mapFromEntries: <K, A>(ordK: Ord.Ord<K>, typeK: t.Type<K>, typeA: t.Type<A>) =>
    new Type_(
      `ReadonlyMap<${typeK.name},${typeA.name}>`,
      Guard.mapFromEntries<K, A>(ordK, typeK, typeA).is,
      flow(
        t.array(t.tuple(typeK, typeA)).decode,
        E.map(RM.fromFoldable(ordK, Sg.last(), RA.Foldable)),
      ),
      Encoder.mapFromEntries(ordK, typeK, typeA).encode,
    ),
}
