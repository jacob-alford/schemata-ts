import * as Enc from '../src/internal/EncoderBase'

const _ = Enc.Schemable

describe('EncoderBase', () => {
  test('URI', () => {
    expect(Enc.URI).toBe(Enc.URI)
  })
  describe('constructors', () => {
    test('literal', () => {
      const test: 'a' | 'b' | 'c' = 'a'
      expect(_.literal('a', 'b', 'c').encode(test)).toEqual(test)
    })
  })
  describe('primitives', () => {
    test('string', () => {
      expect(_.string.encode('a')).toEqual('a')
    })
    test('number', () => {
      expect(_.number.encode(5)).toEqual(5)
    })
    test('boolean', () => {
      expect(_.boolean.encode(true)).toEqual(true)
    })
  })
  describe('combinators', () => {
    test('nullable', () => {
      expect(_.nullable(_.string).encode(null)).toEqual(null)
    })
    test('struct', () => {
      expect(
        _.struct({
          a: _.string,
          b: _.number,
        }).encode({
          a: 'a',
          b: 5,
        })
      ).toEqual({ a: 'a', b: 5 })
    })
    test('partial', () => {
      expect(
        _.partial({
          a: _.string,
          b: _.number,
        }).encode({ a: 'a' })
      ).toStrictEqual({ a: 'a' })
    })
    test('record', () => {
      expect(_.record(_.string).encode({ a: 'a' })).toStrictEqual({ a: 'a' })
    })
    test('array', () => {
      expect(_.array(_.string).encode(['a'])).toStrictEqual(['a'])
    })
    test('non-empty tuple', () => {
      expect(_.tuple(_.string, _.number).encode(['a', 5])).toStrictEqual(['a', 5])
    })
    test('empty tuple', () => {
      expect(_.tuple().encode([])).toStrictEqual([])
    })
    test('intersect', () => {
      expect(
        _.intersect(_.struct({ a: _.string, b: _.number }))(
          _.struct({ b: _.number, c: _.boolean })
        ).encode({ a: 'a', b: 5, c: true })
      ).toStrictEqual({ a: 'a', b: 5, c: true })
    })
    test('sum', () => {
      type SumType = 'A' | 'B' | 'C'
      const sumType: SumType = 'A'
      expect(
        _.sum(sumType)({
          A: _.record(_.literal('A')),
          B: _.record(_.literal('B')),
          // @ts-expect-error -- typelevel difference
        }).encode({ A: 'A', B: 'B' })
      ).toStrictEqual({ A: 'A', B: 'B' })
    })
    test('lazy', () => {
      const enc = _.lazy('', () => _.number)
      expect(enc.encode(5)).toEqual(5)
    })
    test('readonly', () => {
      expect(_.readonly(_.string).encode('a')).toEqual('a')
    })
  })
})
