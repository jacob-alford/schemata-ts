import * as E from 'fp-ts/Either'

import * as Base64 from '../../../src/schemata/Base64'
import { getAllInstances, validateArbitrary } from '../../../test-utils'

const { Arbitrary, Decoder, Eq, Guard, TaskDecoder, Type } = getAllInstances(
  Base64.Base64,
)

const validStrings = [
  '',
  'Zg==',
  'Zm8=',
  'Zm9v',
  'Zm9vYg==',
  'Zm9vYmE=',
  'Zm9vYmFy',
  'TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdC4=',
  'Vml2YW11cyBmZXJtZW50dW0gc2VtcGVyIHBvcnRhLg==',
  'U3VzcGVuZGlzc2UgbGVjdHVzIGxlbw==',
  'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuMPNS1Ufof9EW/M98FNw' +
    'UAKrwflsqVxaxQjBQnHQmiI7Vac40t8x7pIb8gLGV6wL7sBTJiPovJ0V7y7oc0Ye' +
    'rhKh0Rm4skP2z/jHwwZICgGzBvA0rH8xlhUiTvcwDCJ0kc+fh35hNt8srZQM4619' +
    'FTgB66Xmp4EtVyhpQV+t02g6NzK72oZI0vnAvqhpkxLeLiMCyrI416wHm5Tkukhx' +
    'QmcL2a6hNOyu0ixX/x2kSFXApEnVrJ+/IxGyfyw8kf4N2IZpW5nEP847lpfj0SZZ' +
    'Fwrd1mnfnDbYohX2zRptLy2ZUn06Qo9pkG5ntvFEPo9bfZeULtjYzIl6K8gJ2uGZ' +
    'HQIDAQAB',
]

const invalidStrings = [
  '12345',
  'Vml2YW11cyBmZXJtZtesting123',
  'Zg=',
  'Z===',
  'Zm=8',
  '=m9vYg==',
  'Zm9vYmFy====',
]

describe('Base64', () => {
  describe('Decoder', () => {
    test.each(validStrings)('validates valid base64 strings, %s', str => {
      const result = Decoder.decode(str)
      expect(result).toStrictEqual(E.right(str))
    })
    test.each(invalidStrings)('invalidates invalid base64 strings, %s', str => {
      const result = Decoder.decode(str)
      expect(result._tag).toBe('Left')
    })
  })

  describe('Eq', () => {
    test.each(validStrings)('determines two strings are equal, %s', str1 => {
      const guard = Guard.is
      const eq = Eq.equals

      if (!guard(str1)) {
        throw new Error('Unexpected result')
      }

      expect(eq(str1, str1)).toBe(true)
    })
  })

  describe('Guard', () => {
    test.each(validStrings)('validates valid base64 strings, %s', str => {
      const result = Guard.is(str)
      expect(result).toBe(true)
    })
    test.each(invalidStrings)('invalidates invalid base64 strings, %s', str => {
      const result = Guard.is(str)
      expect(result).toBe(false)
    })
  })

  describe('TaskDecoder', () => {
    test.each(validStrings)('validates valid base64 strings, %s', async str => {
      const result = await TaskDecoder.decode(str)()
      expect(result).toStrictEqual(E.right(str))
    })
    test.each(invalidStrings)('invalidates invalid base64 strings, %s', async str => {
      const result = await TaskDecoder.decode(str)()
      expect(result._tag).toBe('Left')
    })
  })

  describe('Type', () => {
    test.each(validStrings)('validates valid base64 strings, %s', str => {
      const result = Type.decode(str)
      expect(result).toStrictEqual(E.right(str))
    })
    test.each(invalidStrings)('invalidates invalid base64 strings, %s', str => {
      const result = Type.decode(str)
      expect(result._tag).toBe('Left')
    })
  })

  describe('Very long, non-url safe string', () => {
    for (let i = 0, str = '', encoded; i < 1000; i++) {
      str += String.fromCharCode((Math.random() * 26) | 97)
      encoded = Buffer.from(str).toString('base64')

      if (!Guard.is(encoded)) {
        const msg = `validator.isBase64() failed with "${encoded}"`
        throw new Error(msg)
      }
    }
  })

  describe('isBase64', () => {
    const str = `hQGkA8uYb/u24XuEAQzAh5dH2QUPv5rQ+uHwVQQShCgmgJzlOAq+L6Ld4l4P0MOeUYK7Zvt7HiYM
MzH5Pdi+VfiW0JWDqTdvQZS6o0SfBzoZqwqplAofLH+7hlu8qS0n6FFxXk2b4N5InMf/zWlqpDb6
oeGZQBbLJy69drKzpJYvqMM+OuzLUA4Wwv/WfwGtHo/fQ3H2JSFwPJz3QHuqvTrnIhO23fZa8Qpd
M36LBbX3yqrmrJo63NHy9QL9eF6+/WU7qsKOxGSm2QlDaREKx6ZlXgZ+FY7SEt1C6PHPXhggf4Ts
EF5rb+0goEniDbgiofYpUt0+aLkwsNnMYHx0+yAelPP45ZbCKxQe1Tk3gq5oAspWvUAvt6SqmNW5
CrakBXYSIpNqHWdjdW75yeUYPKIi1X1SZi1mVGy0ayrOGoPbOY6C77JwGMxqEOZtDLBiy/u9g1II
Zy1dm3UxhX/Tir2Cg+5kTAVQ6qqliklhGSCcYw0rNMfl+q151zKu4/j9id5pHnrkjnjrV1odz3u/
aBKxLpzf8cf2BlYdRooqvFIbdJULftmn0lABukKc0eaPclSdz//DzTU318fpHnFbzlUpi82UVNL4
IUqUviQNw7SX41v90N39iNP3JmczkN8J70+o7NLYlcvp4xXIFOcRaDrinbCcXT1WfQ==`

    expect(Guard.is(str)).toBeTruthy
  })

  describe('Arbitrary', () => {
    it('generates valid Base64s', () => {
      validateArbitrary({ Arbitrary }, Guard.is)
    })
  })

  describe('Schema', () => {
    it('derives an encoder', () => {
      expect(Decoder.decode('12345')._tag).toEqual('Left')
      expect(
        Decoder.decode(
          'TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdC4=',
        ),
      ).toEqual(
        E.right(
          'TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdC4=',
        ),
      )
    })
  })
})
