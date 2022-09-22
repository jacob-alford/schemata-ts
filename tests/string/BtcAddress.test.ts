import * as RA from 'fp-ts/ReadonlyArray'
import { tuple } from 'fp-ts/function'
import * as BtcAddress from '../src/string/BtcAddress'

import { cat, combineExpected, validateArbitrary } from '../test-utils'

const validAddresses = [
  '1MUz4VMYui5qY1mxUiG8BQ1Luv6tqkvaiL',
  '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy',
  'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq',
  '14qViLJfdGaP4EeHnDyJbEGQysnCpwk3gd',
  '35bSzXvRKLpHsHMrzb82f617cV4Srnt7hS',
  '17VZNX1SN5NtKa8UQFxwQbFeFc3iqRYhemt',
  'bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4',
]

const invalidAddresses = [
  '4J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy',
  '0x56F0B8A998425c53c75C4A303D4eF987533c5597',
  'pp8skudq3x5hzw8ew7vzsw8tn4k8wxsqsv0lt0mf3g',
  '17VZNX1SN5NlKa8UQFxwQbFeFc3iqRYhem',
  'BC1QW508D6QEJXTDG4Y5R3ZARVAYR0C5XW7KV8F3T4',
]

describe('BtcAddress', () => {
  describe('Decoder', () => {
    test.each(
      cat(
        combineExpected(validAddresses, 'Right'),
        combineExpected(invalidAddresses, 'Left')
      )
    )(
      'validates valid BTC addresses, and catches bad addresses',
      (address, expectedTag) => {
        const result = BtcAddress.Decoder.decode(address)
        expect(result._tag).toBe(expectedTag)
      }
    )
  })
  describe('Eq', () => {
    test.each(RA.zipWith(validAddresses, validAddresses, tuple))(
      'determines two addresses are equal',
      (address1, address2) => {
        if (!BtcAddress.Guard.is(address1) || !BtcAddress.Guard.is(address2))
          throw new Error('Unexpected result')
        expect(BtcAddress.Eq.equals(address1, address2)).toBe(true)
      }
    )
  })
  describe('Guard', () => {
    test.each(
      cat(combineExpected(validAddresses, true), combineExpected(invalidAddresses, false))
    )(
      'validates valid BTC addresses, and catches bad addresses',
      (address, expectedTag) => {
        const result = BtcAddress.Guard.is(address)
        expect(result).toBe(expectedTag)
      }
    )
  })
  describe('TaskDecoder', () => {
    test.each(
      cat(
        combineExpected(validAddresses, 'Right'),
        combineExpected(invalidAddresses, 'Left')
      )
    )(
      'validates valid BTC addresses, and catches bad addresses',
      async (address, expectedTag) => {
        const result = await BtcAddress.TaskDecoder.decode(address)()
        expect(result._tag).toBe(expectedTag)
      }
    )
  })
  describe('Type', () => {
    test.each(
      cat(
        combineExpected(validAddresses, 'Right'),
        combineExpected(invalidAddresses, 'Left')
      )
    )(
      'validates valid BTC addresses, and catches bad addresses',
      (address, expectedTag) => {
        const result = BtcAddress.Type.decode(address)
        expect(result._tag).toBe(expectedTag)
      }
    )
  })

  describe('Arbitrary', () => {
    it('generates valid BtcAddresses', () => {
      validateArbitrary(BtcAddress, BtcAddress.isBtcAddress)
    })
  })
})
