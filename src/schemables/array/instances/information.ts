import { pipe } from 'fp-ts/function'
import { concatAll } from 'fp-ts/Monoid'
import * as N from 'fp-ts/number'
import * as Inf from 'schemata-ts/internal/information'
import { type WithArray } from 'schemata-ts/schemables/array/definition'

export const ArrayInformation: WithArray<Inf.SchemableLambda> = {
  array: (params = {}) => {
    const { minLength = 0, maxLength = 2 ** 32 - 2 } = params
    const informationPerItem = Inf.informationFromSampleSize(maxLength - minLength)
    return item => Inf.makeInformation(informationPerItem * item)
  },
  tuple: (_, ...items) =>
    pipe(items, concatAll(N.MonoidProduct), _ => Inf.makeInformation(_)),
}
