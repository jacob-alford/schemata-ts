import * as fc from 'fast-check'
import { getArbitrary } from 'schemata-ts/Arbitrary'
import { getGuard } from 'schemata-ts/Guard'
import * as S from 'schemata-ts/schemata'

describe('WithUnknown', () => {
  const Schema = S.Unknown
  const Guard = getGuard(Schema)
  const Arb = getArbitrary(Schema)
  it('has a valid Arbitrary instance', () => {
    fc.assert(fc.property(Arb.arbitrary(fc), Guard.is))
  })
})
