import * as assert from 'assert'
// e.g. src/domain/User.ts
  import * as fc from 'fast-check'
  import * as E from 'fp-ts/Either'
  import * as O from 'fp-ts/Option'
  import * as S from '../../src/schemata'
  import { getArbitrary } from '../../src/Arbitrary'
  import { getCodec } from '../../src/Codec'
  import { getEq } from '../../src/Eq'

  export const User = S.Struct({
    id: S.UUID(5),
    created_at: S.DateFromIsoString({ requireTime: 'None' }),
    updated_at: S.DateFromIsoString({ requireTime: 'TimeAndOffset' }),
    email: S.EmailAddress,
    name: S.NonEmptyString,
    username: S.Ascii,
    age: S.PositiveInt,
    favorite_color: S.OptionFromNullable(S.HexColor),
  })

  export type User = S.TypeOf<typeof User>
  export type UserInput = S.InputOf<typeof User>

  export const arbitrary = getArbitrary(User).arbitrary(fc)
  export const codec = getCodec(User)
  export const eq = getEq(User)

  // ...elsewhere

  const validInput = {
    id: '987FBC97-4BED-5078-AF07-9141BA07C9F3',
    created_at: '+002021-10-31',
    updated_at: '2022-11-22T18:30Z',
    name: 'Johnathan Doe',
    email: 'jdoe22@probably-doesnt-exist.com',
    username: 'jdoe22',
    age: 52,
    favorite_color: null,
  }

  const expectedOutput = {
    id: '987FBC97-4BED-5078-AF07-9141BA07C9F3',
    created_at: new Date('+002021-10-31'),
    updated_at: new Date('2022-11-22T18:30Z'),
    name: 'Johnathan Doe',
    email: 'jdoe22@probably-doesnt-exist.com',
    username: 'jdoe22',
    age: 52,
    favorite_color: O.none,
  }

  assert.deepStrictEqual(codec.decode(validInput), E.right(expectedOutput))

  const invalidInput = codec.decode({
    // not a UUID
    id: 123,
    // Not ISO 8601 compliant, though parsable with `new Date()`
    created_at: 'October 31, 2021',
    updated_at: 'November 22, 2022 12:30',
    // Empty string not allowed
    name: '',
    // Non-ASCII characters not allowed
    username: '😂😂😂',
    // Non-negative Ints only
    age: 0,
    // hex color values only
    favorite_color: 'rgb(105, 190, 239)',
  })

  assert.equal(invalidInput._tag, 'Left')
