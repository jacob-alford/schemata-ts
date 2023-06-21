import * as B from 'fp-ts/boolean'
import { pipe } from 'fp-ts/function'
import * as RR from 'fp-ts/ReadonlyRecord'
import * as Str from 'fp-ts/string'
import * as Eq from 'schemata-ts/internal/eq'
import { type WithStruct } from 'schemata-ts/schemables/struct/definition'
import { remapPropertyKeys } from 'schemata-ts/schemables/struct/utils'

export const StructEq: WithStruct<Eq.SchemableLambda> = {
  struct: properties => {
    const lookupByOutputKey = remapPropertyKeys(properties)

    return Eq.fromEquals((x, y) => {
      const keysX = Object.keys(x as any)
      const keysY = Object.keys(y as any)

      if (keysX.length !== keysY.length) return false

      return pipe(
        lookupByOutputKey,
        RR.foldMapWithIndex(Str.Ord)(B.MonoidAll)((key, eqs) => {
          for (const { member, guard } of eqs) {
            if (guard.is(x[key]) && guard.is(y[key])) {
              return member.equals(x[key], y[key])
            }
          }
          return false
        }),
      )
    })
  },
}
