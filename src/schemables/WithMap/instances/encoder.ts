/**
 * Represents a ReadonlyMap converted from an expected array of entries.
 *
 * @since 1.0.0
 */
import { flow } from 'fp-ts/function'
import * as RA from 'fp-ts/ReadonlyArray'
import * as RM from 'fp-ts/ReadonlyMap'
import * as RTup from 'fp-ts/ReadonlyTuple'
import * as Enc from 'io-ts/Encoder'
import { WithMap2 } from 'schemata-ts/schemables/WithMap/definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Encoder: WithMap2<Enc.URI> = {
  mapFromEntries: (ordK, sk, sa) => ({
    encode: flow(RM.toReadonlyArray(ordK), RA.map(RTup.bimap(sa.encode, sk.encode))),
  }),
}
