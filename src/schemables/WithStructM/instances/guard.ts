import * as B from 'fp-ts/boolean'
import { pipe } from 'fp-ts/function'
import * as Pred from 'fp-ts/Predicate'
import * as RR from 'fp-ts/ReadonlyRecord'
import * as Str from 'fp-ts/string'
import * as G from 'schemata-ts/Guard'
import { hasOwn } from 'schemata-ts/internal/util'
import { WithStructM } from 'schemata-ts/schemables/WithStructM/definition'
import { keyIsNotMapped } from 'schemata-ts/struct'

export const WithStructMGuard: WithStructM<G.SchemableLambda> = {
  structM: (properties, params = { extraProps: 'strip' }) => {
    const remappedProps: Record<string, G.Guard<unknown>> = {}
    for (const key in properties) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const prop = properties[key]!
      if (keyIsNotMapped(prop._keyRemap)) {
        remappedProps[key] = prop._val
        continue
      }
      remappedProps[prop._keyRemap] = prop._val
    }
    return {
      is: pipe(
        (u: unknown) => typeof u === 'object' && u !== null && !Array.isArray(u),
        Pred.and(u => {
          const knownKeysAreValid = pipe(
            remappedProps,
            RR.foldMapWithIndex(Str.Ord)(B.MonoidAll)((key, _val) => {
              const inputAtKey: unknown = (u as any)[key]
              return _val.is(inputAtKey)
            }),
          )

          // -- if extra props are stripped then their presence is not a failure
          if (params.extraProps === 'strip') return knownKeysAreValid

          // -- if extra props are not allowed, return a failure on keys not specified in properties
          if (params.extraProps === 'error') {
            for (const key in u as any) {
              if (!hasOwn(remappedProps, key) || remappedProps[key] === undefined)
                return false
            }
            return knownKeysAreValid
          }

          if (params.restParam === undefined) return knownKeysAreValid

          for (const key in u as any) {
            const inputAtKey: unknown = (u as any)[key]
            if (hasOwn(remappedProps, key) || remappedProps[key] !== undefined) continue
            if (!params.restParam.is(inputAtKey)) return false
          }
          return knownKeysAreValid
        }),
        a => a as any,
      ),
    }
  },
}
