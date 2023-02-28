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
 *   import { getCodec } from 'schemata-ts/Codec'
 *   import { getEq } from 'schemata-ts/Eq'
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
 *   export const codec = getCodec(User)
 *   export const eq = getEq(User)
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
 *   assert.deepStrictEqual(codec.decode(validInput), E.right(expectedOutput))
 *
 *   const invalidInput = codec.decode({
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
import * as hkt from 'schemata-ts/HKT'
import { Schemable } from 'schemata-ts/Schemable'

/**
 * @since 1.0.0
 * @category Model
 */
export interface Schema<E, A> {
  <S extends hkt.SchemableLambda>(S: Schemable<S>): hkt.SchemableKind<S, E, A>
}

/**
 * @since 2.0.0
 * @category Type Lambdas
 */
export interface SchemableLambda extends hkt.SchemableLambda {
  readonly type: Schema<this['Input'], this['Output']>
}

const memoize = <A, B>(f: (a: A) => B): ((a: A) => B) => {
  const cache = new Map()
  return a => {
    if (!cache.has(a)) {
      const b = f(a)
      cache.set(a, b)
      return b
    }
    return cache.get(a)
  }
}

/** @internal */
export const make = <S extends Schema<any, any>>(
  f: S,
): S extends (...args: ReadonlyArray<any>) => {
  Input: (...args: ReadonlyArray<any>) => infer E
  Output: (...args: ReadonlyArray<any>) => infer A
}
  ? Schema<E, A>
  : never => {
  return memoize(f) as any
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
export type TypeOf<S> = S extends Schema<unknown, infer A> ? A : never

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
export type InputOf<S> = S extends Schema<infer I, unknown> ? I : never

/**
 * Derives a typeclass instance from a Schema by supplying Schemable. i.e. `schemata-ts/Decoder`
 *
 * @since 1.0.0
 * @category Destructors
 */
export const interpret: <S extends hkt.SchemableLambda>(
  S: Schemable<S>,
) => <E, A>(schema: Schema<E, A>) => hkt.SchemableKind<S, E, A> = S => schema => schema(S)
