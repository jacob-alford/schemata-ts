import { BitcoinAddress } from '../../../src/schemata/BitcoinAddress'
import { getAllInstances, validateArbitrary } from '../../../test-utils-old'

const BtcAddress = getAllInstances(BitcoinAddress)

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
    test.each(validAddresses)('validates valid btc address %s', address => {
      const result = BtcAddress.Decoder.decode(address)
      expect(result._tag).toBe('Right')
    })
    test.each(invalidAddresses)('invalidates invalid btc address %s', address => {
      const result = BtcAddress.Decoder.decode(address)
      expect(result._tag).toBe('Left')
    })
  })
  describe('Eq', () => {
    test.each(validAddresses)('determines two addresses are equal', address1 => {
      if (!BtcAddress.Guard.is(address1)) throw new Error('Unexpected result')
      expect(BtcAddress.Eq.equals(address1, address1)).toBe(true)
    })
  })
  describe('Guard', () => {
    test.each(validAddresses)('validates valid BTC addresses %s', address => {
      const result = BtcAddress.Guard.is(address)
      expect(result).toBe(true)
    })
    test.each(invalidAddresses)('invalidates invalid BTC addresses %s', address => {
      const result = BtcAddress.Guard.is(address)
      expect(result).toBe(false)
    })
  })
  describe('TaskDecoder', () => {
    test.each(validAddresses)('validates valid BTC addresses %s', async address => {
      const result = await BtcAddress.TaskDecoder.decode(address)()
      expect(result._tag).toBe('Right')
    })
    test.each(invalidAddresses)('invalidates invalid BTC addresses %s', async address => {
      const result = await BtcAddress.TaskDecoder.decode(address)()
      expect(result._tag).toBe('Left')
    })
  })
  describe('Type', () => {
    test.each(validAddresses)('validates valid BTC addresses %s', address => {
      const result = BtcAddress.Type.decode(address)
      expect(result._tag).toBe('Right')
    })
    test.each(invalidAddresses)('invalidates invalid BTC addresses %s', address => {
      const result = BtcAddress.Type.decode(address)
      expect(result._tag).toBe('Left')
    })
  })

  describe('Arbitrary', () => {
    it('generates valid BtcAddresses', () => {
      validateArbitrary(BtcAddress, BtcAddress.Guard.is)
    })
  })
})
