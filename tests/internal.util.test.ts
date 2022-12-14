import { base64Encode, forIn, parse, stringify, urlifyBase64 } from '../src/internal/util'
import { zipN } from '../test-utils'

describe('stringify', () => {
  it("doesn't throw on circular references", () => {
    const a: any = {}
    a.a = a
    expect(JSON.parse(stringify(a))).toStrictEqual(JSON.parse('{"a":"[Circular]"}'))
  })
  it("doesn't throw on BigInts", () => {
    expect(JSON.parse(stringify(1n))).toStrictEqual('1n')
    expect(JSON.parse(stringify(BigInt(Number.MAX_SAFE_INTEGER)))).toStrictEqual(
      `${BigInt(Number.MAX_SAFE_INTEGER)}n`,
    )
    expect(JSON.parse(stringify({ a: 2n }))).toStrictEqual({ a: '2n' })
  })
  it('handles undefined', () => {
    expect(JSON.parse(stringify(undefined))).toStrictEqual('[undefined]')
    expect(JSON.parse(stringify({ a: undefined }))).toStrictEqual({ a: '[undefined]' })
  })
  it('handles NaN', () => {
    expect(JSON.parse(stringify(NaN))).toStrictEqual('[NaN]')
    expect(JSON.parse(stringify({ a: NaN }))).toStrictEqual({ a: '[NaN]' })
  })
  it('handles Infinity', () => {
    expect(JSON.parse(stringify(Infinity))).toStrictEqual('[Infinity]')
    expect(JSON.parse(stringify({ a: Infinity }))).toStrictEqual({ a: '[Infinity]' })
  })
  it('handles deeply nested objects', () => {
    const test = {
      a: {
        b: {
          c: undefined,
        },
        d: Infinity,
        e: NaN,
        f: {
          g: -Infinity,
          h: 1n,
        },
      },
    } as any
    test.circ = test
    expect(JSON.parse(stringify(test))).toStrictEqual({
      a: {
        b: {
          c: '[undefined]',
        },
        d: '[Infinity]',
        e: '[NaN]',
        f: {
          g: '[-Infinity]',
          h: '1n',
        },
      },
      circ: '[Circular]',
    })
  })
})

describe('parse', () => {
  it("doesn't throw on circular references", () => {
    const a: any = {}
    a.a = a
    expect(parse(stringify(a))).toStrictEqual({ a: '[Circular]' })
  })
  it("doesn't throw on BigInts", () => {
    expect(parse(stringify({ a: '1n' }))).toStrictEqual({ a: 1n })
  })
  it('handles NaN', () => {
    expect(parse('{"a":"[NaN]"}')).toStrictEqual({ a: NaN })
  })
  it('handles Infinity', () => {
    expect(parse('{"a":"[Infinity]"}')).toStrictEqual({ a: Infinity })
    expect(parse('{"a":"[-Infinity]"}')).toStrictEqual({ a: -Infinity })
  })
  it('handles deeply nested objects', () => {
    const test = {
      u: undefined,
      a: {
        b: {
          c: null,
        },
        d: Infinity,
        e: NaN,
        f: {
          g: -Infinity,
          h: 1n,
        },
      },
    } as any
    test.circ = test
    expect(parse(stringify(test))).toStrictEqual(
      Object.assign({}, test, { circ: '[Circular]', u: '[undefined]' }),
    )
  })
})

describe('forIn', () => {
  it("doesn't iterate over inherited properties", () => {
    const a = { a: 1, b: 2 }
    const b = Object.create(a)
    b.c = 3
    const eff = jest.fn<void, [string, number]>(() => void 0)
    forIn((k, v) => () => eff(k, v))(b)()
    expect(eff).toHaveBeenCalledTimes(1)
    expect(eff).toHaveBeenCalledWith('c', 3)
  })
  it("doesn't iterate over nonenumerable properties", () => {
    const a = { a: 1, b: 2 }
    Object.defineProperty(a, 'c', {
      value: 3,
      enumerable: false,
    })
    const eff = jest.fn<void, [string, number]>(() => void 0)
    forIn((k, v) => () => eff(k, v))(a)()
    expect(eff).toHaveBeenCalledTimes(2)
    expect(eff).toHaveBeenCalledWith('a', 1)
    expect(eff).toHaveBeenCalledWith('b', 2)
  })
})

describe('base64Encode', () => {
  it('should encode a string', () => {
    expect(base64Encode('hello')).toBe('aGVsbG8=')
  })
})

describe('urlifyBase64', () => {
  it('should replace =', () => {
    expect(urlifyBase64('=aGVsbG8=')).toBe('aGVsbG8')
  })
  it('should replace +', () => {
    expect(urlifyBase64('+aGVsbG8+')).toBe('-aGVsbG8-')
  })
  it('should replace /', () => {
    expect(urlifyBase64('/aGVsbG8/')).toBe('_aGVsbG8_')
  })
})

describe('zipN', () => {
  it("doesn't zip empty", () => {
    expect(zipN([], [1, 2], [true, false, true])).toStrictEqual([])
  })
  it('zips 2', () => {
    expect(zipN([1, 2, 3], ['a', 'b', 'c', 'd'])).toStrictEqual([
      [1, 'a'],
      [2, 'b'],
      [3, 'c'],
    ])
    expect(zipN([1, 2, 3, 4], ['a', 'b', 'c'])).toStrictEqual([
      [1, 'a'],
      [2, 'b'],
      [3, 'c'],
    ])
  })
  it('zips 3', () => {
    expect(zipN([1, 2, 3], ['a', 'b', 'c', 'd'], [true, false, true])).toStrictEqual([
      [1, 'a', true],
      [2, 'b', false],
      [3, 'c', true],
    ])
    expect(zipN([1, 2, 3, 4], ['a', 'b', 'c'], [true, false, true, false])).toStrictEqual(
      [
        [1, 'a', true],
        [2, 'b', false],
        [3, 'c', true],
      ],
    )
  })
  it('zips 4', () => {
    expect(
      zipN([1, 2, 3], ['a', 'b', 'c', 'd'], [true, false, true], ['x', 'y', 'z', 'w']),
    ).toStrictEqual([
      [1, 'a', true, 'x'],
      [2, 'b', false, 'y'],
      [3, 'c', true, 'z'],
    ])
    expect(
      zipN([1, 2, 3, 4], ['a', 'b', 'c'], [true, false, true, false], ['x', 'y', 'z']),
    ).toStrictEqual([
      [1, 'a', true, 'x'],
      [2, 'b', false, 'y'],
      [3, 'c', true, 'z'],
    ])
  })
})
