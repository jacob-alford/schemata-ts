/** @since 1.4.0 */
import { getGuard } from 'schemata-ts/derivations/guard-schemable'
import { getInformation } from 'schemata-ts/derivations/information-schemable'
import { getMergeSemigroup } from 'schemata-ts/derivations/merge-semigroup-schemable'
import { getTypeString } from 'schemata-ts/derivations/type-string-schemable'
import { camelCase } from 'schemata-ts/internal/camelcase'
import {
  type OptionalInputProps,
  type RequiredInputProps,
} from 'schemata-ts/internal/schema-utils'
import { type SchemableKind, type SchemableLambda } from 'schemata-ts/internal/schemable'
import { remapKey } from 'schemata-ts/internal/struct'
import { type Combine } from 'schemata-ts/internal/type-utils'
import { type OutputOf, type Schema, make } from 'schemata-ts/Schema'
import type * as s from 'schemata-ts/schemables/struct/type-utils'
import type { CamelCase } from 'type-fest'

/**
 * The same as the `Struct` schema combinator, but keys are transformed to camel case in
 * the output type.
 *
 * **Warning** It is possible to have one or more input keys map to the same output key.
 * This combination will produce unlawful instances.
 *
 * @since 1.4.0
 * @category Combinators
 * @example
 *   import * as E from 'fp-ts/Either'
 *   import * as S from 'schemata-ts/schemata'
 *   import { getDecoder } from 'schemata-ts/Decoder'
 *
 *   const DatabasePerson = S.CamelCaseKeys({
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
export const CamelCaseKeys: <T extends Record<string, Schema<any, any>>>(
  props: T,
  extraProps?: 'strip' | 'error',
  mergeStrategy?: 'first' | 'last',
) => Schema<
  Combine<RequiredInputProps<T> & OptionalInputProps<T>>,
  {
    [K in keyof T as CamelCase<K, { preserveConsecutiveUppercase: true }>]: OutputOf<T[K]>
  }
> = (props, extraProps = 'strip', mergeStrategy) =>
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
        semigroup: getMergeSemigroup(schema).semigroup(mergeStrategy),
        name: getTypeString(schema)[0],
      }
    }
    return _.struct(struct as any, extraProps)
  }) as any
