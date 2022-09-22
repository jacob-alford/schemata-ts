import { pipe, unsafeCoerce } from 'fp-ts/function'
import * as E from 'fp-ts/Either'
import * as RA from 'fp-ts/ReadonlyArray'
import { Eq, Encoder, Decoder, Guard, UUID, TaskDecoder, Type } from '../src/string/UUID'

const _: (n: string) => UUID = unsafeCoerce

const hexa: () => string = () => Math.random().toString(16).slice(-1).toUpperCase()
const hexaN: (n: number) => () => string = n => () => RA.makeBy(n, hexa).join('')
const v4v5: () => string = () =>
  unsafeCoerce(['8', '9', 'A', 'B'][Math.floor(Math.random() * 4)])

const makev1: () => UUID = () =>
  _(`${hexaN(8)()}-${hexaN(4)()}-1${hexaN(3)()}-${hexaN(4)()}-${hexaN(12)()}`)
const makev2: () => UUID = () =>
  _(`${hexaN(8)()}-${hexaN(4)()}-2${hexaN(3)()}-${hexaN(4)()}-${hexaN(12)()}`)
const makev3: () => UUID = () =>
  _(`${hexaN(8)()}-${hexaN(4)()}-3${hexaN(3)()}-${hexaN(4)()}-${hexaN(12)()}`)
const makev4: () => UUID = () =>
  _(`${hexaN(8)()}-${hexaN(4)()}-4${hexaN(3)()}-${v4v5()}${hexaN(3)()}-${hexaN(12)()}`)
const makev5: () => UUID = () =>
  _(`${hexaN(8)()}-${hexaN(4)()}-5${hexaN(3)()}-${v4v5()}${hexaN(3)()}-${hexaN(12)()}`)

describe('UUID', () => {
  describe('v1', () => {
    describe('Decoder', () => {
      it('catches an invalid UUID', () => {
        const result = Decoder({ version: 1 }).decode('1.1')
        expect(result._tag).toBe('Left')
      })
      it('validates a valid UUID', () => {
        const result = Decoder({ version: 1 }).decode(makev1())
        expect(result._tag).toBe('Right')
      })
    })
    describe('Encoder', () => {
      const original: string = makev1()
      const roundtrip = pipe(
        original,
        Decoder({ version: 1 }).decode,
        E.map(Encoder({ version: 1 }).encode),
        E.getOrElse(() => 'invalid')
      )
      expect(original).toEqual(roundtrip)
    })
    describe('Eq', () => {
      it('returns true for similar UUIDs', () => {
        const test = makev1()
        expect(Eq({ version: 1 }).equals(test, test)).toBe(true)
      })
      it('returns false for dissimilar UUIDs', () => {
        expect(Eq({ version: 1 }).equals(_('1'), _('2'))).toBe(false)
      })
    })
    describe('Guard', () => {
      it('guards against invalid UUID', () => {
        expect(Guard({ version: 1 }).is('')).toBe(false)
      })
      it('permits a valid UUID', () => {
        expect(Guard({ version: 1 }).is(makev1())).toBe(true)
      })
    })
    describe('Type', () => {
      it('decodes an invalid UUID', () => {
        const result = Type({ version: 1 }).decode('1.1')
        expect(result._tag).toBe('Left')
      })
      it('decodes an valid UUID', () => {
        const result = Type({ version: 1 }).decode(makev1())
        expect(result._tag).toBe('Right')
      })
    })
    describe('TaskDecoder', () => {
      it('invalidates an invalid date', async () => {
        const result = await TaskDecoder({ version: 1 }).decode('')()
        expect(result._tag).toBe('Left')
      })
      it('validates an valid date', async () => {
        const result = await TaskDecoder({ version: 1 }).decode(makev1())()
        expect(result._tag).toBe('Right')
      })
    })
  })
  describe('v2', () => {
    describe('Decoder', () => {
      it('catches an invalid UUID', () => {
        const result = Decoder({ version: 2 }).decode('1.1')
        expect(result._tag).toBe('Left')
      })
      it('validates a valid UUID', () => {
        const result = Decoder({ version: 2 }).decode(makev2())
        expect(result._tag).toBe('Right')
      })
    })
    describe('Encoder', () => {
      const original: string = makev2()
      const roundtrip = pipe(
        original,
        Decoder({ version: 2 }).decode,
        E.map(Encoder({ version: 2 }).encode),
        E.getOrElse(() => 'invalid')
      )
      expect(original).toEqual(roundtrip)
    })
    describe('Eq', () => {
      it('returns true for similar UUIDs', () => {
        const test = makev2()
        expect(Eq({ version: 2 }).equals(test, test)).toBe(true)
      })
      it('returns false for dissimilar UUIDs', () => {
        expect(Eq({ version: 2 }).equals(_('1'), _('2'))).toBe(false)
      })
    })
    describe('Guard', () => {
      it('guards against invalid UUID', () => {
        expect(Guard({ version: 2 }).is('')).toBe(false)
      })
      it('permits a valid UUID', () => {
        expect(Guard({ version: 2 }).is(makev2())).toBe(true)
      })
    })
    describe('TaskDecoder', () => {
      it('invalidates an invalid date', async () => {
        const result = await TaskDecoder({ version: 2 }).decode('')()
        expect(result._tag).toBe('Left')
      })
      it('validates an valid date', async () => {
        const result = await TaskDecoder({ version: 2 }).decode(makev2())()
        expect(result._tag).toBe('Right')
      })
    })
    describe('Type', () => {
      it('decodes an invalid UUID', () => {
        const result = Type({ version: 2 }).decode('1.1')
        expect(result._tag).toBe('Left')
      })
      it('decodes an valid UUID', () => {
        const result = Type({ version: 2 }).decode(makev2())
        expect(result._tag).toBe('Right')
      })
    })
  })
  describe('v3', () => {
    describe('Decoder', () => {
      it('catches an invalid UUID', () => {
        const result = Decoder({ version: 3 }).decode('1.1')
        expect(result._tag).toBe('Left')
      })
      it('validates a valid UUID', () => {
        const result = Decoder({ version: 3 }).decode(makev3())
        expect(result._tag).toBe('Right')
      })
    })
    describe('Encoder', () => {
      const original: string = makev3()
      const roundtrip = pipe(
        original,
        Decoder({ version: 3 }).decode,
        E.map(Encoder({ version: 3 }).encode),
        E.getOrElse(() => 'invalid')
      )
      expect(original).toEqual(roundtrip)
    })
    describe('Eq', () => {
      it('returns true for similar UUIDs', () => {
        const test = makev3()
        expect(Eq({ version: 3 }).equals(test, test)).toBe(true)
      })
      it('returns false for dissimilar UUIDs', () => {
        expect(Eq({ version: 3 }).equals(_('1'), _('2'))).toBe(false)
      })
    })
    describe('Guard', () => {
      it('guards against invalid UUID', () => {
        expect(Guard({ version: 3 }).is('')).toBe(false)
      })
      it('permits a valid UUID', () => {
        expect(Guard({ version: 3 }).is(makev3())).toBe(true)
      })
    })
    describe('TaskDecoder', () => {
      it('invalidates an invalid date', async () => {
        const result = await TaskDecoder({ version: 2 }).decode('')()
        expect(result._tag).toBe('Left')
      })
      it('validates an valid date', async () => {
        const result = await TaskDecoder({ version: 2 }).decode(makev2())()
        expect(result._tag).toBe('Right')
      })
    })
    describe('Type', () => {
      it('decodes an invalid UUID', () => {
        const result = Type({ version: 3 }).decode('1.1')
        expect(result._tag).toBe('Left')
      })
      it('decodes an valid UUID', () => {
        const result = Type({ version: 3 }).decode(makev3())
        expect(result._tag).toBe('Right')
      })
    })
  })
  describe('v4', () => {
    describe('Decoder', () => {
      it('catches an invalid UUID', () => {
        const result = Decoder({ version: 4 }).decode('1.1')
        expect(result._tag).toBe('Left')
      })
      it('validates a valid UUID', () => {
        const result = Decoder({ version: 4 }).decode(makev4())
        expect(result._tag).toBe('Right')
      })
    })
    describe('Encoder', () => {
      const original: string = makev4()
      const roundtrip = pipe(
        original,
        Decoder({ version: 4 }).decode,
        E.map(Encoder({ version: 4 }).encode),
        E.getOrElse(() => 'invalid')
      )
      expect(original).toEqual(roundtrip)
    })
    describe('Eq', () => {
      it('returns true for similar UUIDs', () => {
        const test = makev4()
        expect(Eq({ version: 4 }).equals(test, test)).toBe(true)
      })
      it('returns false for dissimilar UUIDs', () => {
        expect(Eq({ version: 4 }).equals(_('1'), _('2'))).toBe(false)
      })
    })
    describe('Guard', () => {
      it('guards against invalid UUID', () => {
        expect(Guard({ version: 4 }).is('')).toBe(false)
      })
      it('permits a valid UUID', () => {
        expect(Guard({ version: 4 }).is(makev4())).toBe(true)
      })
    })
    describe('TaskDecoder', () => {
      it('invalidates an invalid date', async () => {
        const result = await TaskDecoder({ version: 4 }).decode('')()
        expect(result._tag).toBe('Left')
      })
      it('validates an valid date', async () => {
        const result = await TaskDecoder({ version: 4 }).decode(makev4())()
        expect(result._tag).toBe('Right')
      })
    })
    describe('Type', () => {
      it('decodes an invalid UUID', () => {
        const result = Type({ version: 4 }).decode('1.1')
        expect(result._tag).toBe('Left')
      })
      it('decodes an valid UUID', () => {
        const result = Type({ version: 4 }).decode(makev4())
        expect(result._tag).toBe('Right')
      })
    })
  })
  describe('v5', () => {
    describe('Decoder', () => {
      it('catches an invalid UUID', () => {
        const result = Decoder({ version: 5 }).decode('1.1')
        expect(result._tag).toBe('Left')
      })
      it('validates a valid UUID', () => {
        const result = Decoder({ version: 5 }).decode(makev5())
        expect(result._tag).toBe('Right')
      })
    })
    describe('Encoder', () => {
      const original: string = makev5()
      const roundtrip = pipe(
        original,
        Decoder({ version: 5 }).decode,
        E.map(Encoder({ version: 5 }).encode),
        E.getOrElse(() => 'invalid')
      )
      expect(original).toEqual(roundtrip)
    })
    describe('Eq', () => {
      it('returns true for similar UUIDs', () => {
        const test = makev5()
        expect(Eq({ version: 5 }).equals(test, test)).toBe(true)
      })
      it('returns false for dissimilar UUIDs', () => {
        expect(Eq({ version: 5 }).equals(_('1'), _('2'))).toBe(false)
      })
    })
    describe('Guard', () => {
      it('guards against invalid UUID', () => {
        expect(Guard({ version: 5 }).is('')).toBe(false)
      })
      it('permits a valid UUID', () => {
        expect(Guard({ version: 5 }).is(makev5())).toBe(true)
      })
    })
    describe('TaskDecoder', () => {
      it('invalidates an invalid date', async () => {
        const result = await TaskDecoder({ version: 5 }).decode('')()
        expect(result._tag).toBe('Left')
      })
      it('validates an valid date', async () => {
        const result = await TaskDecoder({ version: 5 }).decode(makev5())()
        expect(result._tag).toBe('Right')
      })
    })
    describe('Type', () => {
      it('decodes an invalid UUID', () => {
        const result = Type({ version: 5 }).decode('1.1')
        expect(result._tag).toBe('Left')
      })
      it('decodes an valid UUID', () => {
        const result = Type({ version: 5 }).decode(makev5())
        expect(result._tag).toBe('Right')
      })
    })
  })
  describe('all', () => {
    describe('Decoder', () => {
      it('catches an invalid UUID', () => {
        const result = Decoder({ version: 'all' }).decode('1.1')
        expect(result._tag).toBe('Left')
      })
      it('validates a valid UUID', () => {
        const result = Decoder({ version: 'all' }).decode(makev1())
        expect(result._tag).toBe('Right')
      })
    })
    describe('Encoder', () => {
      const original: string = makev1()
      const roundtrip = pipe(
        original,
        Decoder({ version: 'all' }).decode,
        E.map(Encoder({ version: 'all' }).encode),
        E.getOrElse(() => 'invalid')
      )
      expect(original).toEqual(roundtrip)
    })
    describe('Eq', () => {
      it('returns true for similar UUIDs', () => {
        const test = makev5()
        expect(Eq({ version: 'all' }).equals(test, test)).toBe(true)
      })
      it('returns false for dissimilar UUIDs', () => {
        expect(Eq({ version: 'all' }).equals(_('1'), _('2'))).toBe(false)
      })
    })
    describe('Guard', () => {
      it('guards against invalid UUID', () => {
        expect(Guard({ version: 'all' }).is('')).toBe(false)
      })
      it('permits a valid UUID', () => {
        expect(Guard({ version: 'all' }).is(makev2())).toBe(true)
      })
    })
    describe('TaskDecoder', () => {
      it('invalidates an invalid date', async () => {
        const result = await TaskDecoder({ version: 'all' }).decode('')()
        expect(result._tag).toBe('Left')
      })
      it('validates an valid date', async () => {
        const result = await TaskDecoder({ version: 'all' }).decode(makev4())()
        expect(result._tag).toBe('Right')
      })
    })
    describe('Type', () => {
      it('decodes an invalid UUID', () => {
        const result = Type({ version: 'all' }).decode('1.1')
        expect(result._tag).toBe('Left')
      })
      it('decodes an valid UUID', () => {
        const result = Type({ version: 'all' }).decode(makev5())
        expect(result._tag).toBe('Right')
      })
    })
  })
})
