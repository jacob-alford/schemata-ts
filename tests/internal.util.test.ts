import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'

import { base64Encode, forIn, traverseESO, urlifyBase64 } from '../src/internal/util'
import { zipN } from '../test-utils'

describe('traverseESO', () => {
  it('skips unenumerable properties', () => {
    const tester = jest.fn()
    const obj = {
      a: 1,
    }
    Object.defineProperty(obj, 'b', {
      value: 2,
    })
    const result = pipe(
      obj,
      traverseESO((_, value) => {
        tester(value)
        return O.some(E.right(value))
      }),
    )
    expect(tester).toHaveBeenCalledTimes(1)
    expect(result).toStrictEqual(E.right({ a: 1 }))
  })
  it('skips inherited properties', () => {
    const tester = jest.fn()
    const obj = {
      a: 1,
      __proto__: {
        b: 2,
      },
    }
    const result = pipe(
      obj,
      traverseESO((_, value) => {
        tester(value)
        return O.some(E.right(value))
      }),
    )
    expect(tester).toHaveBeenCalledTimes(1)
    expect(result).toStrictEqual(E.right({ a: 1 }))
  })
  it('skips indices on none', () => {
    const obj = {
      a: 1,
      b: 2,
      c: 3,
    }
    const result = pipe(
      obj,
      traverseESO((_, value) => {
        return value === 2 ? O.none : O.some(E.right(value))
      }),
    )
    expect(result).toStrictEqual(E.right({ a: 1, c: 3 }))
  })
  it('fails fast', () => {
    const tester = jest.fn()
    const obj = {
      a: 1,
      b: 2,
      c: 3,
    }
    const result = pipe(
      obj,
      traverseESO((_, value) => {
        tester(value)
        return value === 2 ? O.some(E.left('fail')) : O.some(E.right(value))
      }),
    )
    expect(tester).toHaveBeenCalledTimes(2)
    expect(result).toStrictEqual(E.left('fail'))
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
