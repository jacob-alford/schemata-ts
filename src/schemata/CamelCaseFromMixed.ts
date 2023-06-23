/** @since 1.4.0 */
import { getGuard } from 'schemata-ts/derivations/guard-schemable'
import { getInformation } from 'schemata-ts/derivations/information-schemable'
import { camelCase } from 'schemata-ts/internal/camelcase'
import { type SchemableKind, type SchemableLambda } from 'schemata-ts/internal/schemable'
import { remapKey } from 'schemata-ts/internal/struct'
import { type InputOf, type OutputOf, type Schema, make } from 'schemata-ts/Schema'
import type * as s from 'schemata-ts/schemables/struct/type-utils'
import type { CamelCase } from 'type-fest'

/**
 * The same as the `Struct` schema combinator, but keys are transformed to camel case in
 * the output type.
 *
 * @since 1.4.0
 * @category Combinators
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
 *   // Schema<
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
export const CamelCaseFromMixed: <T extends Record<string, Schema<unknown, unknown>>>(
  props: T,
) => Schema<
  {
    [K in keyof T]: InputOf<T[K]>
  },
  {
    [K in keyof T as CamelCase<K, { preserveConsecutiveUppercase: true }>]: OutputOf<T[K]>
  }
> = props =>
  make(_ => {
    const struct: Record<string, s.StructProp<any>> = {}
    for (const key in props) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const schema = props[key]!
      const schemable: SchemableKind<SchemableLambda, unknown, unknown> = remapKey(
        schema.runSchema(_),
        _.clone,
        camelCase(key),
      )
      struct[key] = {
        schemable,
        guard: getGuard(schema),
        information: getInformation(schema),
      }
    }
    return _.struct(struct as any)
  }) as any
