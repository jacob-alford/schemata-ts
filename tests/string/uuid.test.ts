import * as RA from 'fp-ts/ReadonlyArray'
import * as UUID from '../../src/string/uuid'
import { validateArbitrary } from '../../test-utils'

const valid_: Readonly<
  Record<UUID.UUIDSchemableOptions['version'], ReadonlyArray<string>>
> = {
  1: ['E034B584-7D89-11E9-9669-1AECF481A97B'],
  2: ['A987FBC9-4BED-2078-CF07-9141BA07C9F3'],
  3: ['A987FBC9-4BED-3078-CF07-9141BA07C9F3'],
  4: [
    '713ae7e3-cb32-45f9-adcb-7c4fa86b90c1',
    '625e63f3-58f5-40b7-83a1-a72ad31acffb',
    '57b73598-8764-4ad0-a76a-679bb6640eb1',
    '9c858901-8a57-4791-81fe-4c455b099bc9',
  ],
  5: [
    '987FBC97-4BED-5078-AF07-9141BA07C9F3',
    '987FBC97-4BED-5078-BF07-9141BA07C9F3',
    '987FBC97-4BED-5078-8F07-9141BA07C9F3',
    '987FBC97-4BED-5078-9F07-9141BA07C9F3',
  ],
  all: [
    'A987FBC9-4BED-3078-CF07-9141BA07C9F3',
    'A117FBC9-4BED-3078-CF07-9141BA07C9F3',
    'A127FBC9-4BED-3078-CF07-9141BA07C9F3',
  ],
}

const invalid_: Readonly<
  Record<UUID.UUIDSchemableOptions['version'], ReadonlyArray<string>>
> = {
  1: [
    'xxxA987FBC9-4BED-3078-CF07-9141BA07C9F3',
    'AAAAAAAA-1111-2222-AAAG',
    'AAAAAAAA-1111-2222-AAAG-111111111111',
    'A987FBC9-4BED-4078-8F07-9141BA07C9F3',
    'A987FBC9-4BED-5078-AF07-9141BA07C9F3',
  ],
  2: [
    '',
    'xxxA987FBC9-4BED-3078-CF07-9141BA07C9F3',
    '11111',
    'AAAAAAAA-1111-1111-AAAG-111111111111',
    'A987FBC9-4BED-4078-8F07-9141BA07C9F3',
    'A987FBC9-4BED-5078-AF07-9141BA07C9F3',
  ],
  3: [
    '',
    'xxxA987FBC9-4BED-3078-CF07-9141BA07C9F3',
    '934859',
    'AAAAAAAA-1111-1111-AAAG-111111111111',
    'A987FBC9-4BED-4078-8F07-9141BA07C9F3',
    'A987FBC9-4BED-5078-AF07-9141BA07C9F3',
  ],
  4: [
    '',
    'xxxA987FBC9-4BED-3078-CF07-9141BA07C9F3',
    '934859',
    'AAAAAAAA-1111-1111-AAAG-111111111111',
    'A987FBC9-4BED-5078-AF07-9141BA07C9F3',
    'A987FBC9-4BED-3078-CF07-9141BA07C9F3',
  ],
  5: [
    '',
    'xxxA987FBC9-4BED-3078-CF07-9141BA07C9F3',
    '934859',
    'AAAAAAAA-1111-1111-AAAG-111111111111',
    '9c858901-8a57-4791-81fe-4c455b099bc9',
    'A987FBC9-4BED-3078-CF07-9141BA07C9F3',
  ],
  all: [
    '',
    'xxxA987FBC9-4BED-3078-CF07-9141BA07C9F3',
    'A987FBC9-4BED-3078-CF07-9141BA07C9F3xxx',
    'A987FBC94BED3078CF079141BA07C9F3',
    '934859',
    '987FBC9-4BED-3078-CF07A-9141BA07C9F3',
    'AAAAAAAA-1111-1111-AAAG-111111111111',
  ],
}

for (const i of RNEA.range(0, 5)) {
  const version = (i || 'all') as UUID.UUIDSchemableOptions['version']
  const valid = valid_[version]
  const invalid = invalid_[version]
  describe(`UUID > ${version === 'all' ? '' : 'v'}${version}`, () => {
    describe('Decoder', () => {
      test.each(cat(combineExpected(valid, 'Right'), combineExpected(invalid, 'Left')))(
        'validates valid strings, and catches bad strings',
        (str, expectedTag) => {
          const result = UUID.Decoder({ version }).decode(str)
          expect(result._tag).toBe(expectedTag)
        }
      )
    })

    describe('Encoder', () => {
      test.each(valid)('encoding a decoded value yields original value', original => {
        const roundtrip = pipe(
          original,
          UUID.Decoder({ version }).decode,
          E.map(UUID.Encoder({ version }).encode),
          E.getOrElseW(() => 'unexpected')
        )
        expect(original).toEqual(roundtrip)
      })
    })

    describe('Eq', () => {
      test.each(RA.zipWith(valid, valid, tuple))(
        'determines two strings are equal',
        (str1, str2) => {
          const guard = UUID.Guard({ version }).is
          const eq = UUID.Eq({ version }).equals
          if (!guard(str1) || !guard(str2)) {
            throw new Error('Unexpected result')
          }
          expect(eq(str1, str2)).toBe(true)
        }
      )
    })

    describe('Guard', () => {
      test.each(cat(combineExpected(valid, true), combineExpected(invalid, false)))(
        'validates valid strings, and catches bad strings',
        (str, expectedTag) => {
          const result = UUID.Guard({ version }).is(str)
          expect(result).toBe(expectedTag)
        }
      )
    })

    describe('TaskDecoder', () => {
      test.each(cat(combineExpected(valid, 'Right'), combineExpected(invalid, 'Left')))(
        'validates valid string, and catches bad string',
        async (str, expectedTag) => {
          const result = await UUID.TaskDecoder({ version }).decode(str)()
          expect(result._tag).toBe(expectedTag)
        }
      )
    })

    describe('Type', () => {
      test.each(cat(combineExpected(valid, 'Right'), combineExpected(invalid, 'Left')))(
        'validates valid strings, and catches bad strings',
        (str, expectedTag) => {
          const result = UUID.Type({ version }).decode(str)
          expect(result._tag).toBe(expectedTag)
        }
      )
    })

    describe('Arbitrary', () => {
      it('generates valid UUID', () => {
        validateArbitrary(
          { Arbitrary: UUID.Arbitrary({ version }) },
          UUID.isUUID({ version })
        )
      })
    })
  })
}
