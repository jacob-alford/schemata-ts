import * as B from 'fp-ts/boolean'
import { flow, pipe, SK } from 'fp-ts/function'
import * as RR from 'fp-ts/ReadonlyRecord'
import * as Str from 'fp-ts/string'
import * as Eq from 'schemata-ts/internal/eq'
import { type WithStruct } from 'schemata-ts/schemables/struct/definition'
import { remapPropertyKeys } from 'schemata-ts/schemables/struct/utils'

export const StructEq: WithStruct<Eq.SchemableLambda> = {
  struct: (
    properties,
    // istanbul ignore next
    extraProps = 'strip',
  ) => {
    const lookupByOutputKey = remapPropertyKeys(properties)

    return Eq.fromEquals((x, y) => {
      const keysX = Object.keys(x as any)
      const keysY = Object.keys(y as any)

      if (keysX.length !== keysY.length) return false

      const knownEqual = pipe(
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

      if (typeof extraProps === 'string') return knownEqual

      for (const keyX of keysX) {
        if (lookupByOutputKey[keyX] !== undefined) continue
        if (y[keyX] === undefined) return false
        const keyXYEq = extraProps.equals(x[keyX], y[keyX])
        if (!keyXYEq) return false
      }

      // Note: it is not necessary to check for extra properties on y,
      // because we already know that they have the same number of keys.
      // if y was not missing a property of x in the undefined check above,
      // then the keys must be the same (and have been checked above)

      return knownEqual
    })
  },
  record: flow(SK, RR.getEq),
  intersection: (x, y) => Eq.fromEquals((a, b) => x.equals(a, b) && y.equals(a, b)),
}
