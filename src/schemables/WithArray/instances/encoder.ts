import { flow, unsafeCoerce } from 'fp-ts/function'
import * as RA from 'fp-ts/ReadonlyArray'
import * as Enc from 'schemata-ts/Encoder'
import { WithArray } from 'schemata-ts/schemables/WithArray/definition'

export const WithArrayEncoder: WithArray<Enc.SchemableLambda> = {
  array: inner => ({
    encode: flow(RA.map(inner.encode), RA.toArray),
  }),
  tuple: (...items) => ({
    encode: a => unsafeCoerce(RA.zipWith(a, items, (a, encoderA) => encoderA.encode(a))),
  }),
}
