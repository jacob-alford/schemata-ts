import * as RA from 'fp-ts/ReadonlyArray'

import { tuple } from 'fp-ts/function'

import { Decoder, Eq, Guard, TaskDecoder, Type } from '../src/string/Base64Url'

import { cat, combineExpected } from '../test-utils'

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
    test.each(
      cat(combineExpected(validStrings, 'Right'), combineExpected(invalidStrings, 'Left'))
    )('validates valid strings, and catches bad strings', (str, expectedTag) => {
      const result = Decoder.decode(str)

      expect(result._tag).toBe(expectedTag)
    })
  })

  describe('Eq', () => {
    test.each(RA.zipWith(validStrings, validStrings, tuple))(
      'determines two strings are equal',

      (str1, str2) => {
        const guard = Guard.is
        const eq = Eq.equals

        if (!guard(str1) || !guard(str2)) {
          throw new Error('Unexpected result')
        }

        expect(eq(str1, str2)).toBe(true)
      }
    )
  })

  describe('Guard', () => {
    test.each(
      cat(combineExpected(validStrings, true), combineExpected(invalidStrings, false))
    )('validates valid strings, and catches bad strings', (str, expectedTag) => {
      const result = Guard.is(str)

      expect(result).toBe(expectedTag)
    })
  })

  describe('TaskDecoder', () => {
    test.each(
      cat(combineExpected(validStrings, 'Right'), combineExpected(invalidStrings, 'Left'))
    )('validates valid strings, and catches bad strings', async (str, expectedTag) => {
      const result = await TaskDecoder.decode(str)()

      expect(result._tag).toBe(expectedTag)
    })
  })

  describe('Type', () => {
    test.each(
      cat(combineExpected(validStrings, 'Right'), combineExpected(invalidStrings, 'Left'))
    )('validates valid strings, and catches bad strings', (str, expectedTag) => {
      const result = Type.decode(str)

      expect(result._tag).toBe(expectedTag)
    })
  })
})
