/**
 * A Codec is a combined Decoder, Encoder, Guard, JsonSerializer, and JsonDeserializer.
 *
 * @since 1.0.1
 * @example
 *   import * as fc from 'fast-check'
 *   import * as E from 'fp-ts/Either'
 *   import { pipe } from 'fp-ts/function'
 *   import * as O from 'fp-ts/Option'
 *   import * as RA from 'fp-ts/ReadonlyArray'
 *   import { getArbitrary } from 'schemata-ts/Arbitrary'
 *   import { getCodec } from 'schemata-ts/Codec'
 *   import * as S from 'schemata-ts/schemata'
 *
 *   export const User = S.Struct({
 *     id: S.UUID(5),
 *     created_at: S.DateFromIsoString({ requireTime: 'None' }),
 *     updated_at: S.DateFromIsoString({ requireTime: 'TimeAndOffset' }),
 *     email: S.EmailAddress,
 *     name: S.NonEmptyString,
 *     username: S.Ascii,
 *     age: S.PositiveInt,
 *     favorite_color: S.OptionFromNullable(S.HexColor),
 *   })
 *
 *   export type User = S.TypeOf<typeof User>
 *   export type UserInput = S.InputOf<typeof User>
 *
 *   export const userArbitrary = getArbitrary(User).arbitrary(fc)
 *   export const userCodec = getCodec(User)
 *
 *   const validInput = {
 *     id: '987FBC97-4BED-5078-AF07-9141BA07C9F3',
 *     created_at: '+002021-10-31',
 *     updated_at: '2022-11-22T18:30Z',
 *     name: 'Johnathan Doe',
 *     email: 'jdoe22@probably-doesnt-exist.com',
 *     username: 'jdoe22',
 *     age: 52,
 *     favorite_color: null,
 *   }
 *
 *   const expectedOutput = {
 *     id: '987FBC97-4BED-5078-AF07-9141BA07C9F3',
 *     created_at: new Date('+002021-10-31'),
 *     updated_at: new Date('2022-11-22T18:30Z'),
 *     name: 'Johnathan Doe',
 *     email: 'jdoe22@probably-doesnt-exist.com',
 *     username: 'jdoe22',
 *     age: 52,
 *     favorite_color: O.none,
 *   }
 *
 *   const invalidInput = {
 *     // not a UUID
 *     id: 123,
 *     // Not ISO 8601 compliant, though parsable with `new Date()`
 *     created_at: 'October 31, 2021',
 *     updated_at: 'November 22, 2022 12:30',
 *     // Empty string not allowed
 *     name: '',
 *     // Non-ASCII characters not allowed
 *     username: '😂😂😂',
 *     // Positive Ints only
 *     age: 0,
 *     // hex color values only
 *     favorite_color: 'rgb(105, 190, 239)',
 *   }
 *
 *   // Using Decoders
 *
 *   assert.deepStrictEqual(userCodec.decode(validInput), E.right(expectedOutput))
 *   assert.deepStrictEqual(userCodec.decode(invalidInput)._tag, 'Left')
 *
 *   // Using Arbitraries, Encoders, and Decoders
 *
 *   const testUsers = fc.sample(userArbitrary, 10)
 *
 *   assert.deepStrictEqual(
 *     pipe(
 *       testUsers,
 *       // Encode the users generated using Arbitrary
 *       RA.map(userCodec.encode),
 *       // Decode the encoded users back to their original form, collecting any errors
 *       E.traverseArray(userCodec.decode),
 *     ),
 *     E.right(testUsers),
 *   )
 */
import { Decoder, getDecoder } from './Decoder'
import { Encoder, getEncoder } from './Encoder'
import { getGuard, Guard } from './Guard'
import { getJsonDeserializer, JsonDeserializer } from './JsonDeserializer'
import { getJsonSerializer, JsonSerializer } from './JsonSerializer'
import { SchemaExt } from './SchemaExt'

/**
 * @since 1.0.1
 * @category Model
 */
export interface Codec<E, A>
  extends Decoder<unknown, A>,
    Encoder<E, A>,
    Guard<unknown, A>,
    JsonSerializer<A>,
    JsonDeserializer<A> {}

/**
 * A Codec is a combined Decoder, Encoder, Guard, JsonSerializer, and JsonDeserializer.
 *
 * @since 1.0.1
 * @category Interpreters
 */
export const getCodec = <E, A>(schema: SchemaExt<E, A>): Codec<E, A> => ({
  ...getDecoder(schema),
  ...getEncoder(schema),
  ...getGuard(schema),
  ...getJsonSerializer(schema),
  ...getJsonDeserializer(schema),
})
