import { string, WithInvariant } from '../src/internal/EqBase'

describe('Eq', () => {
  test('WithInvariant', () => {
    const eq = WithInvariant.imap<Date>(
      { is: (a: unknown): a is Date => a instanceof Date },
      'Date'
    )<string>(
      a => new Date(a),
      a => a.toISOString()
    )(string)
    const test = new Date()
    expect(eq.equals(test, test)).toBe(true)
  })
})
