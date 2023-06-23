import { identity, pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as RA from 'fp-ts/ReadonlyArray'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import * as RR from 'fp-ts/ReadonlyRecord'
import { type SchemableLambda } from 'schemata-ts/HKT'
import { hasOwn } from 'schemata-ts/internal/util'
import {
  type GuardedPrecedentedUnionMember,
  ordGuardedPrecedentedUnionMember,
} from 'schemata-ts/schemables/guarded-union/definition'
import { type StructProp } from 'schemata-ts/schemables/struct/type-utils'
import { getKeyRemap } from 'schemata-ts/struct'

export type UnionItem<S extends SchemableLambda> = GuardedPrecedentedUnionMember<S> & {
  readonly inputKey: string
}

/**
 * Collapses a struct definition into a record with remapped keys whose values are union
 * members of every output key collision for that key.
 */
export const remapPropertyKeys = <S extends SchemableLambda>(
  properties: Record<string, StructProp<S>>,
  mapInformation: (information: number) => number = identity,
): Record<string, RNEA.ReadonlyNonEmptyArray<UnionItem<S>>> => {
  // --- a lookup table of output keys to union items
  const lookupByOutputKey_: Record<string, RNEA.ReadonlyNonEmptyArray<UnionItem<S>>> = {}

  for (const key in properties) {
    // -- ignore inherited properties
    if (!hasOwn(properties, key)) continue

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { schemable, guard, information } = properties[key]!

    const inputKey: string = key
    const outputKey = pipe(
      getKeyRemap(schemable),
      O.getOrElse(() => inputKey),
    )

    const nextUnionItem: UnionItem<S> = {
      member: schemable,
      guard,
      precedence: mapInformation(information),
      inputKey,
    }

    const outputKeyUnion = pipe(
      lookupByOutputKey_,
      RR.lookup(outputKey),
      O.fold(() => RNEA.of(nextUnionItem), RA.append(nextUnionItem)),
    )

    lookupByOutputKey_[outputKey] = outputKeyUnion
  }

  return pipe(lookupByOutputKey_, RR.map(RNEA.sort(ordGuardedPrecedentedUnionMember)))
}

export const safeIntersect = <A, B>(a: A, b: B): A & B => {
  const isObjectA = typeof a === 'object' && a !== null
  const isObjectB = typeof b === 'object' && b !== null
  if (isObjectA || isObjectB) return Object.assign({}, a, b)
  return void 0 as A & B
}
