import * as fc from 'fast-check'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { getArbitrary } from 'schemata-ts/Arbitrary'
import { getDecoder } from 'schemata-ts/Decoder'

import * as Nt from '../../../src/newtype'
import * as S from '../../../src/schemata'

interface UUID extends Nt.Newtype<{ readonly UUID: unique symbol }, string> {}

const uuidIso = Nt.iso<UUID>()

describe('Newtype', () => {
  test('Newtype', () => {
    const uuid = pipe(S.UUID(5), S.Newtype(uuidIso, 'UUIDNt'))
    const decoder = getDecoder(uuid)
    const arb = getArbitrary(uuid)
    fc.assert(
      fc.property(arb.arbitrary(fc), a => {
        expect(decoder.decode(a)).toEqual(E.right(a))
      }),
    )
  })
  test('wrap and unwrap', () => {
    const uuid = pipe(S.UUID(4), S.Newtype(uuidIso, 'UUIDNt'))
    const arb = getArbitrary(uuid)
    fc.assert(
      fc.property(arb.arbitrary(fc), a => {
        expect(Nt.unwrap()(Nt.wrap()(a))).toEqual(a)
      }),
    )
  })
})
