import { base64Encode, urlifyBase64 } from '../src/internal/util'
import { zipN } from '../test-utils'

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
