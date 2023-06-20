import * as Eq from 'fp-ts/Eq'
import { pipe } from 'fp-ts/function'
import * as RA from 'fp-ts/ReadonlyArray'
import * as Inf from 'schemata-ts/internal/information'
import { type WithPrimitives } from 'schemata-ts/schemables/primitives/definition'

export const PrimitivesInformation: WithPrimitives<Inf.SchemableLambda> = {
  string: (params = {}) => {
    const { minLength = Number.MIN_SAFE_INTEGER, maxLength = Number.MAX_SAFE_INTEGER } =
      params
    return Inf.informationFromSampleSize(maxLength - minLength)
  },
  int: (params = {}) => {
    const { min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER } = params
    return Inf.informationFromSampleSize(max - min)
  },
  float: (params = {}) => {
    const { min = -Number.MAX_VALUE, max = Number.MAX_VALUE } = params
    const sampleSize = max - min
    return Number.isFinite(sampleSize)
      ? Inf.informationFromSampleSize(sampleSize)
      : Inf.makeInformation(1024)
  },
  boolean: Inf.informationFromSampleSize(2),
  unknown: Inf.makeInformation(Number.MAX_SAFE_INTEGER),
  literal: (...items) =>
    pipe(items, RA.uniq(Eq.eqStrict), RA.size, unique =>
      Inf.informationFromSampleSize(unique),
    ),
}
