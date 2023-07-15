import { identity, pipe } from 'fp-ts/function'
import { type Kind2, type URIS2 } from 'fp-ts/HKT'
import { type MonadThrow2 } from 'fp-ts/MonadThrow'
import * as O from 'fp-ts/Option'
import * as RA from 'fp-ts/ReadonlyArray'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import * as RR from 'fp-ts/ReadonlyRecord'
import { type Semigroup } from 'fp-ts/Semigroup'
import { type SchemableLambda } from 'schemata-ts/internal/schemable'
import { getKeyRemap } from 'schemata-ts/internal/struct'
import * as TC from 'schemata-ts/internal/transcoder'
import { hasOwn } from 'schemata-ts/internal/util'
import {
  type GuardedPrecedentedUnionMember,
  ordGuardedPrecedentedUnionMember,
} from 'schemata-ts/schemables/guarded-union/definition'
import { type StructProp } from 'schemata-ts/schemables/struct/type-utils'
import { type TranscodeErrors } from 'schemata-ts/TranscodeError'

export type UnionItem<S extends SchemableLambda> = GuardedPrecedentedUnionMember<S> & {
  readonly inputKey: string
  readonly semigroup: Semigroup<any>
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
    // istanbul ignore next
    if (!hasOwn(properties, key)) continue

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { schemable, guard, information, semigroup, name } = properties[key]!

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
      semigroup,
      name,
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

export const getValidateObject: <M extends URIS2>(
  M: MonadThrow2<M>,
) => (
  name: string,
) => (
  u: unknown,
) => Kind2<M, TranscodeErrors, Record<string | number | symbol, unknown>> =
  M => name => u => {
    if (u === null || typeof u !== 'object' || Array.isArray(u)) {
      // istanbul ignore next
      return M.throwError(TC.transcodeErrors(TC.typeMismatch(name, u)))
    }
    return M.of(u as Record<string | number | symbol, unknown>)
  }
