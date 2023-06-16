import * as Base64Url from '../../../src/schemata/Base64Url'
import { getAllInstances, validateArbitrary } from '../../../test-utils'

const { Arbitrary, Decoder, Eq, Guard, TaskDecoder, Type } = getAllInstances(
  Base64Url.Base64Url,
)

const validStrings = [
  '',
  'bGFkaWVzIGFuZCBnZW50bGVtZW4sIHdlIGFyZSBmbG9hdGluZyBpbiBzcGFjZQ',
  '1234',
  'bXVtLW5ldmVyLXByb3Vk',
  'PDw_Pz8-Pg',
  'VGhpcyBpcyBhbiBlbmNvZGVkIHN0cmluZw',
]

const invalidStrings = [
  ' AA',
  '\tAA',
  '\rAA',
  '\nAA',
  'This+isa/bad+base64Url==',
  '0K3RgtC+INC30LDQutC+0LTQuNGA0L7QstCw0L3QvdCw0Y8g0YHRgtGA0L7QutCw',
]

describe('Base64Url', () => {
  describe('Decoder', () => {
    test.each(validStrings)('validates valid base64url strings, %s', str => {
      const result = Decoder.decode(str)

      expect(result._tag).toBe('Right')
    })
    test.each(invalidStrings)('invalidates invalid base64url strings, %s', str => {
      const result = Decoder.decode(str)

      expect(result._tag).toBe('Left')
    })
  })

  describe('Eq', () => {
    test.each(validStrings)('determines two strings are equal', str1 => {
      const guard = Guard.is
      const eq = Eq.equals

      if (!guard(str1)) {
        throw new Error('Unexpected result')
      }

      expect(eq(str1, str1)).toBe(true)
    })
  })

  describe('Guard', () => {
    test.each(validStrings)('validates valid base64url strings', str => {
      const result = Guard.is(str)

      expect(result).toBe(true)
    })
    test.each(invalidStrings)('invalidates invalid base64url strings, %s', str => {
      const result = Guard.is(str)

      expect(result).toBe(false)
    })
  })

  describe('TaskDecoder', () => {
    test.each(validStrings)('validates valid base64url strings, %s', async str => {
      const result = await TaskDecoder.decode(str)()

      expect(result._tag).toBe('Right')
    })
    test.each(invalidStrings)('invalidates invalid base64url strings, %s', async str => {
      const result = await TaskDecoder.decode(str)()

      expect(result._tag).toBe('Left')
    })
  })

  describe('Type', () => {
    test.each(validStrings)('validates valid baes64url strings, %s', str => {
      const result = Type.decode(str)

      expect(result._tag).toBe('Right')
    })
    test.each(invalidStrings)('invalidates invalid baes64url strings, %s', str => {
      const result = Type.decode(str)

      expect(result._tag).toBe('Left')
    })
  })

  describe('Arbitrary', () => {
    it('generates valid Base64Urls', () => {
      validateArbitrary({ Arbitrary }, Guard.is)
    })
  })
})
