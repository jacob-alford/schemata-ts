import * as RA from 'fp-ts/ReadonlyArray'

import { tuple } from 'fp-ts/function'

import { Decoder, Eq, Guard, isBase64, TaskDecoder, Type } from '../src/string/Base64'

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

describe('Base64', () => {
  describe('Decoder', () => {
    test.each(
      cat(combineExpected(validStrings, 'Right'), combineExpected(invalidStrings, 'Left'))
    )('validates valid strings, and catches bad strings', (num, expectedTag) => {
      const result = Decoder().decode(num)

      expect(result._tag).toBe(expectedTag)
    })
  })

  describe('Eq', () => {
    test.each(RA.zipWith(validStrings, validStrings, tuple))(
      'determines two strings are equal',

      (num1, num2) => {
        const guard = Guard({ urlSafe: true }).is
        const eq = Eq().equals

        if (!guard(num1) || !guard(num2)) {
          throw new Error('Unexpected result')
        }

        expect(eq(num1, num2)).toBe(true)
      }
    )
  })

  describe('Guard', () => {
    test.each(
      cat(combineExpected(validStrings, true), combineExpected(invalidStrings, false))
    )('validates valid strings, and catches bad strings', (num, expectedTag) => {
      const result = Guard({ urlSafe: true }).is(num)

      expect(result).toBe(expectedTag)
    })
  })

  describe('TaskDecoder', () => {
    test.each(
      cat(combineExpected(validStrings, 'Right'), combineExpected(invalidStrings, 'Left'))
    )('validates valid strings, and catches bad strings', async (num, expectedTag) => {
      const result = await TaskDecoder({ urlSafe: true }).decode(num)()

      expect(result._tag).toBe(expectedTag)
    })
  })

  describe('Type', () => {
    test.each(
      cat(combineExpected(validStrings, 'Right'), combineExpected(invalidStrings, 'Left'))
    )('validates valid strings, and catches bad strings', (num, expectedTag) => {
      const result = Type({ urlSafe: true }).decode(num)

      expect(result._tag).toBe(expectedTag)
    })
  })

  describe('Very long, non-url safe string', () => {
    for (let i = 0, str = '', encoded; i < 1000; i++) {
      str += String.fromCharCode((Math.random() * 26) | 97)
      encoded = Buffer.from(str).toString('base64')

      if (!isBase64({ urlSafe: false })(encoded)) {
        const msg = `validator.isBase64() failed with "${encoded}"`
        throw new Error(msg)
      }
    }
  })
})
