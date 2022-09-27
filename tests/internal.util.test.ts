import * as fc from 'fast-check'
import { base64Encode, digits, urlifyBase64 } from '../src/internal/util'

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

describe('digits', () => {
  it('should generate a string of digits', () => {
    fc.assert(
      fc.property(digits([1, 2, 3]), s => {
        expect(s.length).toBeGreaterThanOrEqual(1)
        expect(s.length).toBeLessThanOrEqual(3)
        expect(s).toMatch(/^[0-9]+$/)
      })
    )
  })
})
