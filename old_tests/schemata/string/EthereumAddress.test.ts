import { EthereumAddress } from '../../../src/schemata/string/EthereumAddress'
import { getAllInstances, validateArbitrary } from '../../../test-utils'

const EthAddress = getAllInstances(EthereumAddress)

const validAddresses = [
  '0x0000000000000000000000000000000000000001',
  '0x683E07492fBDfDA84457C16546ac3f433BFaa128',
  '0x88dA6B6a8D3590e88E0FcadD5CEC56A7C9478319',
  '0x8a718a84ee7B1621E63E680371e0C03C417cCaF6',
  '0xFCb5AFB808b5679b4911230Aa41FfCD0cd335b42',
]

const invalidAddresses = [
  '0xGHIJK05pwm37asdf5555QWERZCXV2345AoEuIdHt',
  '0xFCb5AFB808b5679b4911230Aa41FfCD0cd335b422222',
  '0xFCb5AFB808b5679b4911230Aa41FfCD0cd33',
  '0b0110100001100101011011000110110001101111',
  '683E07492fBDfDA84457C16546ac3f433BFaa128',
]

describe('EthAddress', () => {
  describe('Decoder', () => {
    test.each(validAddresses)('validates valid eth address %s', address => {
      const result = EthAddress.Decoder.decode(address)
      expect(result._tag).toBe('Right')
    })
    test.each(invalidAddresses)('invalidates invalid eth address %s', address => {
      const result = EthAddress.Decoder.decode(address)
      expect(result._tag).toBe('Left')
    })
  })
  describe('Eq', () => {
    test.each(validAddresses)('determines two addresses are equal', address1 => {
      if (!EthAddress.Guard.is(address1)) throw new Error('Unexpected result')
      expect(EthAddress.Eq.equals(address1, address1)).toBe(true)
    })
  })
  describe('Guard', () => {
    test.each(validAddresses)('validates valid ETH addresses %s', address => {
      const result = EthAddress.Guard.is(address)
      expect(result).toBe(true)
    })
    test.each(invalidAddresses)('invalidates invalid ETH addresses %s', address => {
      const result = EthAddress.Guard.is(address)
      expect(result).toBe(false)
    })
  })
  describe('TaskDecoder', () => {
    test.each(validAddresses)('validates valid ETH addresses %s', async address => {
      const result = await EthAddress.TaskDecoder.decode(address)()
      expect(result._tag).toBe('Right')
    })
    test.each(invalidAddresses)('invalidates invalid ETH addresses %s', async address => {
      const result = await EthAddress.TaskDecoder.decode(address)()
      expect(result._tag).toBe('Left')
    })
  })
  describe('Type', () => {
    test.each(validAddresses)('validates valid ETH addresses %s', address => {
      const result = EthAddress.Type.decode(address)
      expect(result._tag).toBe('Right')
    })
    test.each(invalidAddresses)('invalidates invalid ETH addresses %s', address => {
      const result = EthAddress.Type.decode(address)
      expect(result._tag).toBe('Left')
    })
  })

  describe('Arbitrary', () => {
    it('generates valid EthAddresses', () => {
      validateArbitrary(EthAddress, EthAddress.Guard.is)
    })
  })
})
