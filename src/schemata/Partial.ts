/** @since 1.0.0 */
import { unsafeCoerce } from 'fp-ts/function'
import * as Sg from 'fp-ts/Semigroup'
import { getGuard } from 'schemata-ts/derivations/guard-schemable'
import { getInformation } from 'schemata-ts/derivations/information-schemable'
import { getTypeString } from 'schemata-ts/derivations/type-string-schemable'
import {
  type OptionalInputProps,
  type PartialOutputProps,
  type RequiredInputProps,
} from 'schemata-ts/internal/schema-utils'
import { type SchemableKind, type SchemableLambda } from 'schemata-ts/internal/schemable'
import type * as TS from 'schemata-ts/internal/type-string'
import { type Combine } from 'schemata-ts/internal/type-utils'
import { type Schema, make } from 'schemata-ts/Schema'
import { StructTypeString } from 'schemata-ts/schemables/struct/instances/type-string'
import type * as s from 'schemata-ts/schemables/struct/type-utils'
import { Optional } from 'schemata-ts/schemata/Optional'
/**
 * Used to construct a struct schema with enumerated keys where any number of known keys
 * are permitted.
 *
 * @since 1.0.0
 * @category Combinators
 */
export const Partial = <T extends Record<string, Schema<any, any>>>(
  props: T,
  extraProps: 'strip' | 'error' = 'strip',
): Schema<
  Combine<Partial<RequiredInputProps<T> & OptionalInputProps<T>>>,
  Combine<PartialOutputProps<T>>
> =>
  unsafeCoerce(
    make(_ => {
      const struct: Record<string, s.StructProp<SchemableLambda>> = {}
      const structName: Record<string, s.StructProp<TS.SchemableLambda>> = {}

      for (const key in props) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const schema = Optional(props[key]!)
        const schemable: SchemableKind<SchemableLambda, unknown, unknown> =
          schema.runSchema(_)
        const guard = getGuard(schema)
        const information = getInformation(schema)
        const name = getTypeString(schema)
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
