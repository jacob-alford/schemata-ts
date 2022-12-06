/**
 * Schema combinators for SchemableExt
 *
 * @since 1.0.0
 * @example
 *   // e.g. src/domain/User.ts
 *   import * as fc from 'fast-check'
 *   import * as E from 'fp-ts/Either'
 *   import * as O from 'fp-ts/Option'
 *   import * as S from 'schemata-ts/schemata'
 *   import { getArbitrary } from 'schemata-ts/Arbitrary'
 *   import { getDecoder } from 'schemata-ts/Decoder'
 *   import { getEncoder } from 'schemata-ts/Encoder'
 *   import { getEq } from 'schemata-ts/Eq'
 *   import { getGuard } from 'schemata-ts/Guard'
 *   import { getTaskDecoder } from 'schemata-ts/TaskDecoder'
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
 *   export const arbitrary = getArbitrary(User).arbitrary(fc)
 *   export const decoder = getDecoder(User)
 *   export const encoder = getEncoder(User)
 *   export const eq = getEq(User)
 *   export const guard = getGuard(User)
 *   export const taskDecoder = getTaskDecoder(User)
 *
 *   // ...elsewhere
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
 *   assert.deepStrictEqual(decoder.decode(validInput), E.right(expectedOutput))
 *
 *   const invalidInput = decoder.decode({
 *     // not a UUID
 *     id: 123,
 *     // Not ISO 8601 compliant, though parsable with `new Date()`
 *     created_at: 'October 31, 2021',
 *     updated_at: 'November 22, 2022 12:30',
 *     // Empty string not allowed
 *     name: '',
 *     // Non-ASCII characters not allowed
 *     username: '😂😂😂',
 *     // Non-negative Ints only
 *     age: 0,
 *     // hex color values only
 *     favorite_color: 'rgb(105, 190, 239)',
 *   })
 *
 *   assert.equal(invalidInput._tag, 'Left')
 */
import { unsafeCoerce } from 'fp-ts/function'
import { HKT2, Kind, Kind2, URIS, URIS2 } from 'fp-ts/HKT'
import { interpreter as interpreter_ } from 'io-ts/Schema'
import { memoize } from 'io-ts/Schemable'

import {
  SchemableExt,
  SchemableExt1,
  SchemableExt2,
  SchemableExt2C,
} from './SchemableExt'

/**
 * @since 1.0.0
 * @category Model
 */
export interface SchemaExt<E, A> {
  <S>(S: SchemableExt<S>): HKT2<S, E, A>
}

/**
 * @since 1.0.0
 * @category Model
 */
export type Interpreter = {
  <S extends URIS2>(S: SchemableExt2<S>): <E, A>(
    schema: SchemaExt<E, A>,
  ) => Kind2<S, E, A>
  <S extends URIS2>(S: SchemableExt2C<S>): <A>(
    schema: SchemaExt<unknown, A>,
  ) => Kind2<S, unknown, A>
  <S extends URIS>(S: SchemableExt1<S>): <A>(schema: SchemaExt<unknown, A>) => Kind<S, A>
}

/**
 * @since 1.0.0
 * @category Constructors
 */
export function make<E, A>(f: SchemaExt<E, A>): SchemaExt<E, A> {
  return memoize(f)
}

/**
 * Extract the output of a schema
 *
 * @since 1.0.0
 * @category Utilities
 * @example
 *   import * as O from 'fp-ts/Option'
 *   import * as S from 'schemata-ts/schemata'
 *   import { getEncoder } from 'schemata-ts/Encoder'
 *
 *   const optionFromNullable = S.OptionFromNullable(S.String)
 *
 *   // type Input = S.InputOf<typeof optionFromNullable>
 *   // type Input = string | null
 *
 *   // type Output = S.OutputOf<typeof optionFromNullable>
 *   // Option<string>
 *
 *   const encoder = getEncoder(optionFromNullable)
 *
 *   assert.deepStrictEqual(encoder.encode(O.some('a')), 'a')
 *   assert.deepStrictEqual(encoder.encode(O.none), null)
 */
export type TypeOf<S> = S extends SchemaExt<unknown, infer A> ? A : never

/**
 * Extract the output of a schema.
 *
 * Alias of `TypeOf`
 *
 * @since 1.0.0
 * @category Utilities
 */
export type OutputOf<S> = TypeOf<S>

/**
 * Extract the input type of a schema.
 *
 * @since 1.0.0
 * @category Utilities
 */
export type InputOf<S> = S extends SchemaExt<infer I, unknown> ? I : never

/**
 * Derives a typeclass instance from a Schema by supplying Schemable. i.e. `schemata-ts/Decoder`
 *
 * @since 1.0.0
 * @category Destructors
 */
export const interpret: Interpreter = unsafeCoerce(interpreter_)
