import * as B from 'fp-ts/boolean'
import { pipe } from 'fp-ts/function'
import * as Pred from 'fp-ts/Predicate'
import * as RR from 'fp-ts/ReadonlyRecord'
import * as Str from 'fp-ts/string'
import type * as G from 'schemata-ts/internal/guard'
import { type WithStruct } from 'schemata-ts/schemables/struct/definition'
import { remapPropertyKeys } from 'schemata-ts/schemables/struct/utils'

export const StructGuard: WithStruct<G.SchemableLambda> = {
  struct: (properties, extraProps = 'strip') => {
    const lookupByOutputKey = remapPropertyKeys(properties)

    return {
      is: pipe(
        (u: unknown) => typeof u === 'object' && u !== null && !Array.isArray(u),
        Pred.and(u => {
          // -- if extra props are not allowed, return a failure on keys not specified in properties
          if (extraProps === 'error') {
            for (const key in u as any) {
              if (lookupByOutputKey[key] === undefined) return false
            }
          }

          // -- if extra props are stripped then their presence is not a failure
          return pipe(
            lookupByOutputKey,
            RR.foldMapWithIndex(Str.Ord)(B.MonoidAll)((key, members) => {
              const inputAtKey: unknown = (u as any)[key]
              for (const { member } of members) {
                if (member.is(inputAtKey)) return true
              }
              return false
            }),
          )
        }),
        a => a as any,
      ),
    }
  },
}
