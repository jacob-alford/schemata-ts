/**
 * WithStructM instance for Guard
 *
 * @since 1.3.0
 */
import * as B from 'fp-ts/boolean'
import { pipe, tuple } from 'fp-ts/function'
import * as Pred from 'fp-ts/Predicate'
import * as RR from 'fp-ts/ReadonlyRecord'
import * as Str from 'fp-ts/string'
import * as G from 'schemata-ts/Guard'
import { hasOwn } from 'schemata-ts/internal/util'
import { WithStructM } from 'schemata-ts/schemables/WithStructM/definition'
import { isOptionalFlag, KeyFlag, keyIsNotMapped } from 'schemata-ts/struct'

/**
 * @since 1.3.0
 * @category Instances
 */
export const Guard: WithStructM<G.SchemableLambda> = {
  structM: (properties, params = { extraProps: 'strip' }) => {
    const remappedProps: Record<string, readonly [KeyFlag, G.Guard<unknown, unknown>]> =
      {}
    for (const key in properties) {
      const prop = properties[key]
      if (!hasOwn(properties, key) || prop === undefined) continue
      if (keyIsNotMapped(prop._keyRemap)) {
        remappedProps[key] = tuple(prop._flag, prop._val)
        continue
      }
      remappedProps[prop._keyRemap] = tuple(prop._flag, prop._val)
    }
    return {
      is: pipe(
        G.UnknownRecord.is,
        Pred.and(u => {
          const knownKeysAreValid = pipe(
            remappedProps,
            RR.foldMapWithIndex(Str.Ord)(B.MonoidAll)((key, [_flag, _val]) => {
              const inputAtKey: unknown = (u as any)[key]

              if (
                isOptionalFlag(_flag) &&
                (!hasOwn(u as any, key) || inputAtKey === undefined)
              )
                return true

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
