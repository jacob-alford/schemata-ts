/**
 * Used to construct a struct schema with enumerated keys.
 *
 * @since 1.4.0
 * @category Model
 */
import { getGuard } from 'schemata-ts/derivations/guard-schemable'
import { getInformation } from 'schemata-ts/derivations/information-schemable'
import { SchemableKind, SchemableLambda } from 'schemata-ts/HKT'
import {
  OptionalInputProps,
  OutputProps,
  RequiredInputProps,
} from 'schemata-ts/internal/schema-utils'
import { Combine } from 'schemata-ts/internal/type-utils'
import { make, Schema } from 'schemata-ts/Schema'
import * as s from 'schemata-ts/schemables/struct/type-utils'

/**
 * Used to construct a struct schema with enumerated keys where any number of known keys
 * are permitted.
 *
 * @since 1.0.0
 */
export const Partial = <T extends Record<string, Schema<unknown, unknown>>>(
  props: T,
  extraProps: 'strip' | 'error' = 'strip',
): Schema<
  Combine<Partial<RequiredInputProps<T> & OptionalInputProps<T>>>,
  Combine<OutputProps<T>>
> =>
  make(_ => {
    const struct: Record<string, s.StructProp<SchemableLambda>> = {}
    for (const key in props) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const schema = props[key]!
      const schemable: SchemableKind<SchemableLambda, unknown, unknown> = _.optional(
        schema(_),
      )
      struct[key] = {
        schemable,
        guard: getGuard(schema),
        information: getInformation(schema),
      }
    }
    return _.struct(struct as any, { extraProps })
  })
