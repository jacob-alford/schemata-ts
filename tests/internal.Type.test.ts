import { string, WithInvariant } from '../src/internal/TypeBase'

describe('Type', () => {
  describe('WithInvariant', () => {
    test('guard', () => {
      const t = WithInvariant.imap<Date>(
        { is: (a: unknown): a is Date => a instanceof Date },
        'Date'
      )<string>(
        a => new Date(a),
        a => a.toISOString()
      )(string)
      const test = new Date()
      expect(t.is(test)).toBe(true)
    })
    test('decoder', () => {
      const t = WithInvariant.imap<Date>(
        { is: (a: unknown): a is Date => a instanceof Date },
        'Date'
      )<string>(
        a => new Date(a),
        a => a.toISOString()
      )(string)
      const test = new Date()
      expect(t.decode(test.toISOString())).toStrictEqual({ _tag: 'Right', right: test })
    })
  })
})
