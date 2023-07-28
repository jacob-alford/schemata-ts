/** @since 1.4.0 */
import { deriveGuard } from 'schemata-ts/derivations/guard-schemable'
import { deriveInformation } from 'schemata-ts/derivations/information-schemable'
import { deriveMergeSemigroup } from 'schemata-ts/derivations/merge-semigroup-schemable'
import { deriveTypeString } from 'schemata-ts/derivations/type-string-schemable'
import { camelCase } from 'schemata-ts/internal/camelcase'
import {
  type OptionalInputProps,
  type RequiredInputProps,
  make,
} from 'schemata-ts/internal/schema'
import { type SchemableKind, type SchemableLambda } from 'schemata-ts/internal/schemable'
import { remapKey } from 'schemata-ts/internal/struct'
import type * as TS from 'schemata-ts/internal/type-string'
import { type OutputOf, type Schema } from 'schemata-ts/Schema'
import { StructTypeString } from 'schemata-ts/schemables/struct/instances/type-string'
import type * as s from 'schemata-ts/schemables/struct/type-utils'
import type { CamelCase, Simplify } from 'type-fest'

/**
 * The same as the `Struct` schema combinator, but keys are transformed to camel case in
 * the output type.
 *
 * **Warning** It is possible to have one or more input keys map to the same output key.
 * This combination will produce unlawful instances.
 *
 * @since 1.4.0
 * @category Combinators
 */
export const CamelCaseKeys: <T extends Record<string, Schema<any, any>>>(
  props: T,
  extraProps?: 'strip' | 'error',
  mergeStrategy?: 'first' | 'last',
) => Schema<
  Simplify<RequiredInputProps<T> & OptionalInputProps<T>>,
  {
    [K in keyof T as CamelCase<K, { preserveConsecutiveUppercase: true }>]: OutputOf<T[K]>
  }
> = (props, extraProps = 'strip', mergeStrategy) =>
  make(_ => {
    const struct: Record<string, s.StructProp<any>> = {}
    const structName: Record<string, s.StructProp<TS.SchemableLambda>> = {}
    for (const key in props) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const schema = props[key]!
      const schemable: SchemableKind<SchemableLambda, unknown, unknown> = remapKey(
        schema.runSchema(_),
        _.clone,
        camelCase(key),
      )
      const guard = deriveGuard(schema)
      const information = deriveInformation(schema)
      const name = deriveTypeString(schema)
      const semigroup = deriveMergeSemigroup(schema).semigroup(mergeStrategy)
      struct[key] = {
        schemable,
        guard,
        information,
        semigroup,
        name: name[0],
      }
      structName[key] = {
        schemable: name,
        guard,
        information,
        semigroup,
        name: name[0],
      }
    }
    const wholeName = StructTypeString.struct(structName, extraProps, '')
    return _.struct(struct as any, extraProps, wholeName[0])
  }) as any
