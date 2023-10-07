/** @since 1.4.0 */
import { pipe, unsafeCoerce } from 'fp-ts/function'
import * as RR from 'fp-ts/ReadonlyRecord'
import * as Sg from 'fp-ts/Semigroup'
import { deriveGuard } from 'schemata-ts/derivations/guard-schemable'
import { deriveInformation } from 'schemata-ts/derivations/information-schemable'
import { deriveTypeString } from 'schemata-ts/derivations/type-string-schemable'
import {
  type OptionalInputProps,
  type OutputProps,
  type RequiredInputProps,
  type RestInput,
  type RestOutput,
} from 'schemata-ts/internal/schema'
import { type SchemableKind, type SchemableLambda } from 'schemata-ts/internal/schemable'
import type * as TS from 'schemata-ts/internal/type-string'
import { hasOwn } from 'schemata-ts/internal/util'
import { type Schema, SchemaImplementation } from 'schemata-ts/Schema'
import { type Schemable } from 'schemata-ts/Schemable'
import { StructTypeString } from 'schemata-ts/schemables/struct/instances/type-string'
import type * as s from 'schemata-ts/schemables/struct/type-utils'
import { type Simplify } from 'type-fest'

/**
 * Used to construct a struct schema with enumerated keys.
 *
 * **Note:** Index signatures must accomodate the input/output types for all other
 * enumerated keys. It will decode properly otherwise, but TypeScript will not permit
 * construction of such a type
 *
 * @since 1.0.0
 * @category Combinators
 * @see https://www.typescriptlang.org/docs/handbook/2/objects.html#index-signatures
 */
export const Struct = <T extends PropBase, Ix extends IxSigBase>(
  props: T,
  extraProps: ExtraProps<Ix> = 'strip',
): StructSchema<T, Ix> => new StructSchema(props, extraProps)

type IxSigBase = Schema<any, any> | undefined
type PropBase = Record<string, Schema<any, any>>

type ExtraProps<Ix extends IxSigBase> = 'strip' | 'error' | Ix

type Input<T extends PropBase, Ix extends IxSigBase> = Simplify<
  RestInput<Ix> & RequiredInputProps<T> & OptionalInputProps<T>
>

type Output<T extends PropBase, Ix extends IxSigBase> = Simplify<
  RestOutput<Ix> & OutputProps<T>
>

/** @since 2.1.0 */
class StructSchema<T extends PropBase, Ix extends IxSigBase>
  extends SchemaImplementation<Input<T, Ix>, Output<T, Ix>>
  implements Schema<Input<T, Ix>, Output<T, Ix>>
{
  constructor(
    private readonly props: T,
    private readonly indexSignature: ExtraProps<Ix>,
  ) {
    super(<S extends SchemableLambda>(_: Schemable<S>) => {
      const struct: Record<string, s.StructProp<S>> = {}
      const structName: Record<string, s.StructProp<TS.SchemableLambda>> = {}

      for (const key in props) {
        if (!hasOwn(props, key)) continue
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const schema = props[key]!
        const schemable: SchemableKind<S, unknown, unknown> = schema.runSchema(_)
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

      const extraProps_ =
        indexSignature === undefined || typeof indexSignature === 'string'
          ? (indexSignature as Exclude<Ix, Schema<any, any>>)
          : indexSignature.runSchema(_)
      const extraPropsName_ =
        indexSignature === undefined || typeof indexSignature === 'string'
          ? (indexSignature as Exclude<Ix, Schema<any, any>>)
          : deriveTypeString(indexSignature)

      const wholeName = StructTypeString.struct(structName, extraPropsName_, '')
      return _.struct(struct, extraProps_, wholeName[0]) as SchemableKind<
        S,
        Input<T, Ix>,
        Output<T, Ix>
      >
    })
  }

  /** @since 2.1.0 */
  public pick<K extends keyof T>(
    ...keys: ReadonlyArray<K>
  ): StructSchema<Simplify<Pick<T, K>>, Ix> {
    return new StructSchema(
      pipe(
        this.props,
        RR.filterWithIndex(k => keys.includes(k as K)),
        _ => unsafeCoerce(_),
      ),
      this.indexSignature,
    )
  }

  /** @since 2.1.0 */
  public omit<K extends keyof T>(
    ...keys: ReadonlyArray<K>
  ): StructSchema<Simplify<Omit<T, K>>, Ix> {
    return new StructSchema(
      pipe(
        this.props,
        RR.filterWithIndex(k => !keys.includes(k as K)),
        _ => unsafeCoerce(_),
      ),
      this.indexSignature,
    )
  }
}
