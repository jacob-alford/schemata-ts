import { string, WithInvariant } from '../src/internal/GuardBase'

describe('Guard', () => {
  test('WithInvariant', () => {
    const g = WithInvariant.imap<Date>(
      { is: (a: unknown): a is Date => a instanceof Date },
      'Date'
    )<string>(
      a => new Date(a),
      a => a.toISOString()
    )(string)
    const test = new Date()
    expect(g.is(test)).toBe(true)
  })
})
