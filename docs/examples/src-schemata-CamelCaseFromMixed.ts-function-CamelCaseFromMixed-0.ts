import * as assert from 'assert'
import * as E from 'fp-ts/Either'
  import * as S from '../../src/schemata'
  import { getDecoder } from '../../src/Decoder'

  const DatabasePerson = S.CamelCaseFromMixed({
    first_name: S.String,
    last_name: S.String,
    age: S.Number,
    is_married: S.BooleanFromString,
  })

  // DatabasePerson will have the type:
  // Schema<
  //   { first_name: string, last_name: string, age: number, is_married: string },
  //   { firstName: string, lastName: string, age: number, isMarried: boolean }
  // >

  const decoder = getDecoder(DatabasePerson)

  assert.deepStrictEqual(
    decoder.decode({
      first_name: 'John',
      last_name: 'Doe',
      age: 42,
      is_married: 'false',
    }),
    E.right({
      firstName: 'John',
      lastName: 'Doe',
      age: 42,
      isMarried: false,
    }),
  )
