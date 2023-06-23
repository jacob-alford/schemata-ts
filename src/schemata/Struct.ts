/** @since 1.4.0 */
import { unsafeCoerce } from 'fp-ts/function'
import { getGuard } from 'schemata-ts/derivations/guard-schemable'
import { getInformation } from 'schemata-ts/derivations/information-schemable'
import {
  type OptionalInputProps,
  type OutputProps,
  type RequiredInputProps,
} from 'schemata-ts/internal/schema-utils'
import { type SchemableKind, type SchemableLambda } from 'schemata-ts/internal/schemable'
import { type Combine } from 'schemata-ts/internal/type-utils'
import { type Schema, make } from 'schemata-ts/Schema'
import type * as s from 'schemata-ts/schemables/struct/type-utils'

/**
 * Used to construct a struct schema with enumerated keys.
 *
 * @since 1.0.0
 * @category Combinators
 * @example
 *   import * as E from 'fp-ts/Either'
 *   import * as S from 'schemata-ts/schemata'
 *   import { getDecoder } from 'schemata-ts/Decoder'
 *
 *   const SomeDomainType = S.Struct({
 *     a: S.String,
 *     b: S.BooleanFromNumber,
 *   })
 *
 *   // SomeDomainType will have the type:
 *   // Schema<{ a: string, b: number }, { a: string, b: boolean }>
 *
 *   const decoder = getDecoder(SomeDomainType)
 *
 *   assert.deepStrictEqual(
 *     decoder.decode({
 *       a: 'foo',
 *       b: 0,
 *     }),
 *     E.right({
 *       a: 'foo',
 *       b: false,
 *     }),
 *   )
 */
export const Struct = <T extends Record<string, Schema<any, any>>>(
  props: T,
  extraProps: 'strip' | 'error' = 'strip',
): Schema<
  Combine<RequiredInputProps<T> & OptionalInputProps<T>>,
  Combine<OutputProps<T>>
> =>
  unsafeCoerce(
    make(_ => {
      const struct: Record<string, s.StructProp<SchemableLambda>> = {}
      for (const key in props) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const schema = props[key]!
        const schemable: SchemableKind<SchemableLambda, unknown, unknown> =
          schema.runSchema(_)
        struct[key] = {
          schemable,
          guard: getGuard(schema),
          information: getInformation(schema),
        }
      }
      return _.struct(struct as any, extraProps)
    }),
  )
