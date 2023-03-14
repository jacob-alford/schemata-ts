/**
 * Schemable for widening a type to include undefined. Similar to nullable but for undefined.
 *
 * @since 1.0.0
 */
import { flow, unsafeCoerce } from 'fp-ts/function'
import * as RA from 'fp-ts/ReadonlyArray'
import * as Enc from 'schemata-ts/Encoder'
import { WithArray } from 'schemata-ts/schemables/WithArray/definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Encoder: WithArray<Enc.SchemableLambda> = {
  array: inner => ({
    encode: flow(RA.map(inner.encode), RA.toArray),
  }),
  tuple: (...items) => ({
    encode: a => unsafeCoerce(RA.zipWith(a, items, (a, encoderA) => encoderA.encode(a))),
  }),
}
