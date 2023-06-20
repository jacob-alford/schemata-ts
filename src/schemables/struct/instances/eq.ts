import * as B from 'fp-ts/boolean'
import { pipe } from 'fp-ts/function'
import * as RR from 'fp-ts/ReadonlyRecord'
import * as Str from 'fp-ts/string'
import * as Eq from 'schemata-ts/internal/eq'
import { hasOwn } from 'schemata-ts/internal/util'
import { type WithStruct } from 'schemata-ts/schemables/struct/definition'
import { remapPropertyKeys } from 'schemata-ts/schemables/struct/utils'

export const StructEq: WithStruct<Eq.SchemableLambda> = {
  struct: (properties, params = { extraProps: 'strip' }) => {
    const lookupByOutputKey = remapPropertyKeys(properties)

    return Eq.fromEquals((x, y) => {
      const keysX = Object.keys(x as any)
      const keysY = Object.keys(y as any)
      if (keysX.length !== keysY.length) return false

      const knownPropsEqual = pipe(
        lookupByOutputKey,
        RR.foldMap(Str.Ord)(B.MonoidAll)(eqs => {
          for (const { member, guard } of eqs) {
            if (guard.is(x) && guard.is(y)) {
              return member.equals(x, y)
            }
          }
          return false
        }),
      )

      if (knownPropsEqual === false) return false

      if (params.extraProps !== 'restParam' || params.restParam === undefined) {
        return true
      }

      for (const keyX in x) {
        // -- If the property is a known one, we already checked it
        if (hasOwn(lookupByOutputKey, keyX) || lookupByOutputKey[keyX] !== undefined)
          continue
        // -- If the property is not in the other object the objects are not equal
        if (y[keyX] === undefined) return false
        // -- If the same property is not equal, the objects are not equal
        if (!params.restParam.equals(x[keyX], y[keyX])) return false
      }

      return true
    })
  },
}
