import * as E from 'fp-ts/Either'
import { pipe, tuple } from 'fp-ts/function'
import * as RA from 'fp-ts/ReadonlyArray'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import { UUID, UUIDVersion } from '../../../src/schemata/string/UUID'
import {
  cat,
  combineExpected,
  getAllInstances,
  validateArbitrary,
} from '../../../test-utils'

const valid_: Readonly<Record<UUIDVersion, ReadonlyArray<string>>> = {
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
  any: [
    'A987FBC9-4BED-3078-CF07-9141BA07C9F3',
    'A117FBC9-4BED-3078-CF07-9141BA07C9F3',
    'A127FBC9-4BED-3078-CF07-9141BA07C9F3',
  ],
}

const invalid_: Readonly<Record<UUIDVersion, ReadonlyArray<string>>> = {
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
  any: [
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
  const version = (i || 'any') as UUIDVersion
  const valid = valid_[version]
  const invalid = invalid_[version]
  describe(`UUID > ${version === 'any' ? '' : 'v'}${version}`, () => {
    const instances = getAllInstances(UUID(version))

    describe('Decoder', () => {
      test.each(cat(combineExpected(valid, 'Right'), combineExpected(invalid, 'Left')))(
        'validates valid strings, and catches bad strings',
        (str, expectedTag) => {
          const result = instances.Decoder.decode(str)
          expect(result._tag).toBe(expectedTag)
        },
      )
    })

    describe('Encoder', () => {
      test.each(valid)('encoding a decoded value yields original value', original => {
        const roundtrip = pipe(
          original,
          instances.Decoder.decode,
          E.map(instances.Encoder.encode),
          E.getOrElseW(() => 'unexpected'),
        )
        expect(original).toEqual(roundtrip)
      })
    })

    describe('Eq', () => {
      test.each(RA.zipWith(valid, valid, tuple))(
        'determines two strings are equal',
        (str1, str2) => {
          const guard = instances.Guard.is
          const eq = instances.Eq.equals
          if (!guard(str1) || !guard(str2)) {
            throw new Error('Unexpected result')
          }
          expect(eq(str1, str2)).toBe(true)
        },
      )
    })

    describe('Guard', () => {
      test.each(cat(combineExpected(valid, true), combineExpected(invalid, false)))(
        'validates valid strings, and catches bad strings',
        (str, expectedTag) => {
          const result = instances.Guard.is(str)
          expect(result).toBe(expectedTag)
        },
      )
    })

    describe('TaskDecoder', () => {
      test.each(cat(combineExpected(valid, 'Right'), combineExpected(invalid, 'Left')))(
        'validates valid string, and catches bad string',
        async (str, expectedTag) => {
          const result = await instances.TaskDecoder.decode(str)()
          expect(result._tag).toBe(expectedTag)
        },
      )
    })

    describe('Type', () => {
      test.each(cat(combineExpected(valid, 'Right'), combineExpected(invalid, 'Left')))(
        'validates valid strings, and catches bad strings',
        (str, expectedTag) => {
          const result = instances.Type.decode(str)
          expect(result._tag).toBe(expectedTag)
        },
      )
    })

    describe('Arbitrary', () => {
      it('generates valid UUID', () => {
        validateArbitrary(instances, instances.Guard.is)
      })
    })
  })
}
