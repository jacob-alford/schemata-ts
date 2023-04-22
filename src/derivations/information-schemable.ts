/**
 * A schemable for determining information entropy of a schema.
 *
 * @since 2.0.0
 */
import { Const, make } from 'fp-ts/Const'
import * as Eq from 'fp-ts/Eq'
import { pipe } from 'fp-ts/function'
import * as RA from 'fp-ts/ReadonlyArray'
import * as hkt from 'schemata-ts/HKT'
import { interpret } from 'schemata-ts/Schema'
import { Schemable } from 'schemata-ts/Schemable'

export type Information<A> = Const<number, A>

const makeInformation: <A>(e: unknown) => Information<A> = make as any

interface SchemableLambda extends hkt.SchemableLambda {
  readonly type: Information<this['Output']>
}

const informationFromSampleSize: <A>(sampleSize: number) => Information<A> = sampleSize =>
  makeInformation(Math.log2(sampleSize))

const InformationSchemable: Schemable<SchemableLambda> = {
  string: (params = {}) => {
    const { minLength = Number.MIN_SAFE_INTEGER, maxLength = Number.MAX_SAFE_INTEGER } =
      params
    return informationFromSampleSize(maxLength - minLength)
  },
  int: (params = {}) => {
    const { min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER } = params
    return informationFromSampleSize(max - min)
  },
  float: (params = {}) => {
    const { min = -Number.MAX_VALUE, max = Number.MAX_VALUE } = params
    const sampleSize = max - min
    return Number.isFinite(sampleSize)
      ? informationFromSampleSize(sampleSize)
      : makeInformation(1024)
  },
  boolean: informationFromSampleSize(2),
  unknown: makeInformation(Number.MAX_SAFE_INTEGER),
  literal: (...items) =>
    pipe(items, RA.uniq(Eq.eqStrict), RA.size, unique =>
      informationFromSampleSize(unique),
    ),
}

export const getInformation = interpret(InformationSchemable)
