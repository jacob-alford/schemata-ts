import * as B from 'fp-ts/boolean'
import { pipe } from 'fp-ts/function'
import * as Pred from 'fp-ts/Predicate'
import * as RR from 'fp-ts/ReadonlyRecord'
import * as Str from 'fp-ts/string'
import type * as G from 'schemata-ts/internal/guard'
import { hasOwn } from 'schemata-ts/internal/util'
import { type WithStruct } from 'schemata-ts/schemables/struct/definition'
import { remapPropertyKeys } from 'schemata-ts/schemables/struct/utils'

export const StructGuard: WithStruct<G.SchemableLambda> = {
  struct: (properties, params = { extraProps: 'strip' }) => {
    const lookupByOutputKey = remapPropertyKeys(properties)

    return {
      is: pipe(
        (u: unknown) => typeof u === 'object' && u !== null && !Array.isArray(u),
        Pred.and(u => {
          const keysU = Object.keys(u as any)
          const keysProps = Object.keys(lookupByOutputKey)
          if (
            (params.extraProps !== 'restParam' || params.restParam === undefined) &&
            keysU.length !== keysProps.length
          ) {
            return false
          }

          const knownKeysAreValid = pipe(
            lookupByOutputKey,
            RR.foldMapWithIndex(Str.Ord)(B.MonoidAll)((key, members) => {
              const inputAtKey: unknown = (u as any)[key]
              for (const { member } of members) {
                if (member.is(inputAtKey)) return true
              }
              return false
            }),
          )

          // -- if extra props are stripped then their presence is not a failure
          if (params.extraProps === 'strip') return knownKeysAreValid

          // -- if extra props are not allowed, return a failure on keys not specified in properties
          if (params.extraProps === 'error') {
            for (const key in u as any) {
              if (!hasOwn(lookupByOutputKey, key) || lookupByOutputKey[key] === undefined)
                return false
            }
            return knownKeysAreValid
          }

          if (params.restParam === undefined) return knownKeysAreValid

          for (const key in u as any) {
            const inputAtKey: unknown = (u as any)[key]
            if (hasOwn(lookupByOutputKey, key) || lookupByOutputKey[key] !== undefined)
              continue
            if (!params.restParam.is(inputAtKey)) return false
          }
          return knownKeysAreValid
        }),
        a => a as any,
      ),
    }
  },
}
