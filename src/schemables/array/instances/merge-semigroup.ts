import { pipe } from 'fp-ts/function'
import * as RA from 'fp-ts/ReadonlyArray'
import * as MSg from 'schemata-ts/internal/merge-semigroup'
import { type WithArray } from 'schemata-ts/schemables/array/definition'

export const ArrayMergeSemigroup: WithArray<MSg.SchemableLambda> = {
  array: () => () => MSg.makeMergeSemigroup(() => (x, y) => x.concat(y)),
  tuple: (_, ...items) =>
    MSg.makeMergeSemigroup(
      concrete => (x, y) =>
        pipe(
          items,
          RA.mapWithIndex((i, msg) => msg.semigroup(concrete).concat(x[i], y[i])),
          _ => _ as any,
        ),
    ),
}
