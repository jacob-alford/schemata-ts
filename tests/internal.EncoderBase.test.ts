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
      // TODO @jacob-alford 22-10-20: Figure out why Schemable2 / Encoder Sum is whacky
      const sum = _.sum('tag')
      const encoder = sum({
        // @ts-expect-error -- typelevel difference
        a: _.struct({ tag: _.literal('a'), a: _.string }),
        // @ts-expect-error -- typelevel difference
        b: _.struct({ tag: _.literal('b'), b: _.number }),
      })
      // @ts-expect-error -- typelevel difference
      expect(encoder.encode({ tag: 'a', a: 'a' })).toStrictEqual({ tag: 'a', a: 'a' })
    })
    test('lazy', () => {
      const enc = _.lazy('', () => _.number)
      expect(enc.encode(5)).toEqual(5)
    })
    test('readonly', () => {
      expect(_.readonly(_.string).encode('a')).toEqual('a')
    })
    test('WithRefine', () => {
      const enc = Enc.WithRefine.refine(
        (a: string): a is 'foo' => a === 'foo',
        'isFoo'
      )(_.string)
      expect(enc.encode('foo')).toEqual('foo')
    })
  })
})
