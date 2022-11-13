import * as fc from 'fast-check'
import { interpreter, make } from '../src/SchemaExt'
import { Schemable } from '../src/Arbitrary'
import * as PB from '../src/PatternBuilder'

describe('Arbitrary', () => {
  const User = make(S => S.struct({ name: S.string }))
  const arb = interpreter(Schemable)(User)

  it('interprets a schema', () => {
    fc.assert(
      fc.property(arb, obj => {
        expect(typeof obj.name).toBe('string')
      }),
    )
  })

  it('generates valid check digits', () => {
    const CheckDigit = make(S =>
      S.checkDigit(
        s => s[0] ?? '0',
        1,
      )(S.pattern(PB.sequence(PB.digit, PB.digit), 'first digit is second digit')),
    )
    const arb = interpreter(Schemable)(CheckDigit)

    fc.assert(fc.property(arb, s => /^(\d)\1$/.test(s)))
  })
})
