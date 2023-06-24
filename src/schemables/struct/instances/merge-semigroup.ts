import { pipe } from 'fp-ts/function'
import * as RR from 'fp-ts/ReadonlyRecord'
import * as MSg from 'schemata-ts/internal/merge-semigroup'
import { type WithStruct } from 'schemata-ts/schemables/struct/definition'
import { remapPropertyKeys, safeIntersect } from 'schemata-ts/schemables/struct/utils'

export const StructMergeSemigroup: WithStruct<MSg.SchemableLambda> = {
  struct: properties => {
    const lookupByOutputKey = remapPropertyKeys(properties)
    return MSg.makeMergeSemigroup(
      concrete => (x, y) =>
        pipe(
          lookupByOutputKey,
          RR.mapWithIndex((key, msgs) => {
            const x_: unknown = (x as any)[key]
            const y_: unknown = (y as any)[key]
            for (const { member, guard } of msgs) {
              if (guard.is(x_) && guard.is(y_)) {
                return member.semigroup(concrete).concat(x_, y_)
              }
            }
            return concrete.concat(x_, y_)
          }),
          _ => _ as any,
        ),
    )
  },
  record: (_, codomain) =>
    MSg.constSemigroup(concrete => RR.getUnionMonoid(codomain.semigroup(concrete))),
  intersection: (o1, o2) =>
    MSg.makeMergeSemigroup(concrete => {
      const o1Sg = o1.semigroup(concrete)
      const o2Sg = o2.semigroup(concrete)
      return (x, y) => safeIntersect(o1Sg.concat(x, y), o2Sg.concat(x, y))
    }),
}
