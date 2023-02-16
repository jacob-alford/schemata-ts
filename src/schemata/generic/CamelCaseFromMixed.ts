/**
 * The same as the `Struct` schema combinator, but keys are transformed to camel case in
 * the output type.
 *
 * @since 1.4.0
 * @category Model
 */
import { InputOf, make, OutputOf, SchemaExt } from 'schemata-ts/SchemaExt'
import * as s from 'schemata-ts/struct'
import type { CamelCase } from 'type-fest'

/**
 * @since 1.4.0
 * @category Model
 */
export type CamelCaseFromMixedS = <T extends Record<string, SchemaExt<unknown, unknown>>>(
  props: T,
) => SchemaExt<
  {
    [K in keyof T]: InputOf<T[K]>
  },
  {
    [K in keyof T as CamelCase<K, { preserveConsecutiveUppercase: true }>]: OutputOf<T[K]>
  }
>

/**
 * The same as the `Struct` schema combinator, but keys are transformed to camel case in
 * the output type.
 *
 * @since 1.4.0
 * @category Schema
 * @example
 *   import * as E from 'fp-ts/Either'
 *   import * as S from 'schemata-ts/schemata'
 *   import { getDecoder } from 'schemata-ts/Decoder'
 *
 *   const DatabasePerson = S.CamelCaseFromMixed({
 *     first_name: S.String,
 *     last_name: S.String,
 *     age: S.Number,
 *     is_married: S.BooleanFromString,
 *   })
 *
 *   // DatabasePerson will have the type:
 *   // SchemaExt<
 *   //   { first_name: string, last_name: string, age: number, is_married: string },
 *   //   { firstName: string, lastName: string, age: number, isMarried: boolean }
 *   // >
 *
 *   const decoder = getDecoder(DatabasePerson)
 *
 *   assert.deepStrictEqual(
 *     decoder.decode({
 *       first_name: 'John',
 *       last_name: 'Doe',
 *       age: 42,
 *       is_married: 'false',
 *     }),
 *     E.right({
 *       firstName: 'John',
 *       lastName: 'Doe',
 *       age: 42,
 *       isMarried: false,
 *     }),
 *   )
 */
export const CamelCaseFromMixed: CamelCaseFromMixedS = props =>
  make(S => {
    const props_ = {} as Record<string, unknown>
    for (const k in props) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      props_[k] = s.required(props[k]!(S))
    }
    return S.structM(s.camelCaseKeys(props_ as any)) as any
  })
