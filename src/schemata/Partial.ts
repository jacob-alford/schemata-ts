/** @since 1.0.0 */
import { unsafeCoerce } from 'fp-ts/function'
import { getGuard } from 'schemata-ts/derivations/guard-schemable'
import { getInformation } from 'schemata-ts/derivations/information-schemable'
import { type SchemableKind, type SchemableLambda } from 'schemata-ts/HKT'
import {
  type OptionalInputProps,
  type OutputProps,
  type RequiredInputProps,
} from 'schemata-ts/internal/schema-utils'
import { type Combine } from 'schemata-ts/internal/type-utils'
import { type Schema, make } from 'schemata-ts/Schema'
import type * as s from 'schemata-ts/schemables/struct/type-utils'

/**
 * Used to construct a struct schema with enumerated keys where any number of known keys
 * are permitted.
 *
 * @since 1.0.0
 * @category Combinators
 */
export const Partial = <T extends Record<string, Schema<unknown, unknown>>>(
  props: T,
  extraProps: 'strip' | 'error' = 'strip',
): Schema<
  Combine<Partial<RequiredInputProps<T> & OptionalInputProps<T>>>,
  Combine<OutputProps<T>>
> =>
  unsafeCoerce(
    make(_ => {
      const struct: Record<string, s.StructProp<SchemableLambda>> = {}
      for (const key in props) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const schema = props[key]!
        const schemable: SchemableKind<SchemableLambda, unknown, unknown> = _.optional(
          schema.runSchema(_),
        )
        struct[key] = {
          schemable,
          guard: getGuard(schema),
          information: getInformation(schema),
        }
      }
      return _.struct(struct as any, extraProps)
    }),
  )
