import * as B from 'fp-ts/boolean'
import { pipe } from 'fp-ts/function'
import * as RR from 'fp-ts/ReadonlyRecord'
import * as Str from 'fp-ts/string'
import * as Eq from 'schemata-ts/internal/eq'
import { hasOwn } from 'schemata-ts/internal/util'
import { WithStruct } from 'schemata-ts/schemables/struct/definition'

export const StructMEq: WithStruct<Eq.SchemableLambda> = {
  struct: (properties, params = { extraProps: 'strip' }) => {
    const eqs: Record<string, Eq.Eq<unknown>> = pipe(
      properties,
      RR.map(({ _val }) => _val),
    )

    return {
      equals: (x, y) => {
        if (x === y) {
          return true
        }

        const keysX = Object.keys(x as any)
        const keysY = Object.keys(y as any)

        if (params.extraProps === 'restParam' && keysX.length !== keysY.length) {
          return false
        }

        const knownPropsEqual = pipe(
          eqs,
          RR.foldMapWithIndex(Str.Ord)(B.MonoidAll)(
            (key, eq) =>
              (x as any)[key] === (y as any)[key] ||
              eq.equals((x as any)[key], (y as any)[key]),
          ),
        )

        if (params.extraProps === 'restParam' && params.restParam !== undefined) {
          for (const keyX in x) {
            // -- If the property is a known one, we already checked it
            if (hasOwn(eqs, keyX) || eqs[keyX] !== undefined) continue
            // -- If the property is not in the other object the objects are not equal
            if (y[keyX] === undefined) return false
            // -- If the same property is not equal, the objects are not equal
            if (!params.restParam.equals(x[keyX], y[keyX])) return false
          }
        }

        return knownPropsEqual
      },
    }
  },
}
