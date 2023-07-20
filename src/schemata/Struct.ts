/** @since 1.4.0 */
import { unsafeCoerce } from 'fp-ts/function'
import * as Sg from 'fp-ts/Semigroup'
import { deriveGuard } from 'schemata-ts/derivations/guard-schemable'
import { deriveInformation } from 'schemata-ts/derivations/information-schemable'
import { deriveTypeString } from 'schemata-ts/derivations/type-string-schemable'
import {
  type OptionalInputProps,
  type OutputProps,
  type RequiredInputProps,
} from 'schemata-ts/internal/schema-utils'
import { type SchemableKind, type SchemableLambda } from 'schemata-ts/internal/schemable'
import type * as TS from 'schemata-ts/internal/type-string'
import { type Combine } from 'schemata-ts/internal/type-utils'
import { type Schema, make } from 'schemata-ts/Schema'
import { StructTypeString } from 'schemata-ts/schemables/struct/instances/type-string'
import type * as s from 'schemata-ts/schemables/struct/type-utils'

/**
 * Used to construct a struct schema with enumerated keys.
 *
 * @since 1.0.0
 * @category Combinators
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
      const structName: Record<string, s.StructProp<TS.SchemableLambda>> = {}

      for (const key in props) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const schema = props[key]!
        const schemable: SchemableKind<SchemableLambda, unknown, unknown> =
          schema.runSchema(_)
        const guard = deriveGuard(schema)
        const information = deriveInformation(schema)
        const name = deriveTypeString(schema)
        struct[key] = {
          schemable,
          guard,
          information,
          semigroup: Sg.last(),
          name: name[0],
        }
        structName[key] = {
          schemable: name,
          guard,
          information,
          semigroup: Sg.last(),
          name: name[0],
        }
      }
      const wholeName = StructTypeString.struct(structName, extraProps, '')
      return _.struct(struct as any, extraProps, wholeName[0])
    }),
  )
