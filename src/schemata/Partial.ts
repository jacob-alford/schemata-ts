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
import { type Combine } from 'schemata-ts/internal/type-utils'
import { type Schema, make } from 'schemata-ts/Schema'
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
      for (const key in props) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const schema = Optional(props[key]!)
        const schemable: SchemableKind<SchemableLambda, unknown, unknown> =
          schema.runSchema(_)

        struct[key] = {
          schemable,
          guard: getGuard(schema),
          information: getInformation(schema),
          semigroup: Sg.last(),
          name: getTypeString(schema)[0],
        }
      }
      return _.struct(struct as any, extraProps)
    }),
  )
