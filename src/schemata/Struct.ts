/** @since 1.4.0 */
import { pipe, unsafeCoerce } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as RR from 'fp-ts/ReadonlyRecord'
import * as Sg from 'fp-ts/Semigroup'
import { deriveGuard } from 'schemata-ts/derivations/guard-schemable'
import { deriveInformation } from 'schemata-ts/derivations/information-schemable'
import { deriveTypeString } from 'schemata-ts/derivations/type-string-schemable'
import { type Option as Option_ } from 'schemata-ts/internal/option'
import {
  type OptionalInputProps,
  type OptionOutputProps,
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
import { Imap } from 'schemata-ts/schemata/Imap'
import { Option } from 'schemata-ts/schemata/Option'
import { Optional } from 'schemata-ts/schemata/Optional'
import { Readonly } from 'schemata-ts/schemata/Readonly'
import { type Simplify, type Spread } from 'type-fest'

/**
 * Used to construct a struct schema with enumerated keys.
 *
 * **Note:** Index signatures must accomodate the input/output types for all other
 * enumerated keys. It will decode properly otherwise, but TypeScript will not permit
 * construction of such a type
 *
 * **Note:** The second parameter `extraProps` is deprecated, use `Struct({}).strict()` or
 * `Struct({}).addIndexSignature()` instead
 *
 * @since 1.0.0
 * @category Combinators
 * @see https://www.typescriptlang.org/docs/handbook/2/objects.html#index-signatures
 */
export const Struct = <T extends PropBase, Ix extends IxSigBase = undefined>(
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

type OptionOutput<T extends PropBase, Ix extends IxSigBase> = Simplify<
  RestOutput<Ix> & OptionOutputProps<T>
>

/**
 * Use `Struct({})` schema combinator instead
 *
 * @since 2.1.0
 * @category Transformations
 */
export class StructSchema<T extends PropBase, Ix extends IxSigBase>
  extends SchemaImplementation<Input<T, Ix>, Output<T, Ix>>
  implements Schema<Input<T, Ix>, Output<T, Ix>>
{
  constructor(
    private readonly props: T,
    private readonly indexSignature?: ExtraProps<Ix>,
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

  /**
   * Re-declares a StructSchema by only including specified properties.
   *
   * Returns a new `StructSchema`
   *
   * @since 2.1.0
   */
  public readonly pick = <K extends keyof T>(
    ...keys: ReadonlyArray<K>
  ): StructSchema<Simplify<Pick<T, K>>, Ix> =>
    new StructSchema(
      pipe(
        this.props,
        RR.filterWithIndex(k => keys.includes(k as K)),
        _ => unsafeCoerce(_),
      ),
      this.indexSignature,
    )

  /**
   * Re-declares a StructSchema by excluding specified properties.
   *
   * Returns a new `StructSchema`
   *
   * @since 2.1.0
   */
  public readonly omit = <K extends keyof T>(
    ...keys: ReadonlyArray<K>
  ): StructSchema<Simplify<Omit<T, K>>, Ix> =>
    new StructSchema(
      pipe(
        this.props,
        RR.filterWithIndex(k => !keys.includes(k as K)),
        _ => unsafeCoerce(_),
      ),
      this.indexSignature,
    )

  /**
   * Marks all properties as optional; applies `Partial` to both input and output types.
   *
   * Returns a new schema.
   *
   * @since 2.1.0
   */
  public readonly partial = (): Schema<
    Simplify<Partial<Input<T, Ix>>>,
    Simplify<Partial<Output<T, Ix>>>
  > =>
    unsafeCoerce(
      new StructSchema(pipe(this.props, RR.map(Optional)), this.indexSignature),
    )

  /**
   * A variant of `partial` that applies `Partial` to input properties and maps each
   * output property to the fp-ts `Option` type.
   *
   * Returns a new schema.
   *
   * @since 2.1.0
   */
  public readonly partialOption = (): Schema<
    Simplify<Partial<Input<T, Ix>>>,
    Simplify<OptionOutput<T, Ix>>
  > =>
    unsafeCoerce(
      new StructSchema(pipe(this.props, RR.map(OptionFromOptional)), this.indexSignature),
    )

  /**
   * Marks all properties as readonly; applies `Readonly` to both input and output types.
   *
   * Returns a new schema.
   *
   * @since 2.1.0
   */
  public readonly readonly = (): Schema<
    Simplify<Readonly<Input<T, Ix>>>,
    Simplify<Readonly<Output<T, Ix>>>
  > => Readonly(new StructSchema(this.props, this.indexSignature))

  /**
   * Sets a Struct Schema's index signature to be strict
   *
   * Returns a new `StructSchema`.
   *
   * @since 2.1.0
   */
  public readonly strict = (): StructSchema<T, undefined> =>
    new StructSchema<T, undefined>(this.props, 'error')

  /**
   * Adds an index signature to a Struct Schema.
   *
   * Returns a new `StructSchema`.
   *
   * @since 2.1.0
   */
  public readonly addIndexSignature = <Ix2 extends Schema<any, any>>(
    indexSignature: Ix2,
  ): StructSchema<T, Ix2> => new StructSchema<T, Ix2>(this.props, indexSignature)

  /**
   * Extends a Struct Schema with additional properties. Keys specified in `props` will
   * overwrite keys in `this`.
   *
   * Returns a new `StructSchema`.
   *
   * @since 2.1.0
   */
  public readonly extend = <T2 extends PropBase>(
    props: T2,
  ): StructSchema<Spread<T, T2>, Ix> =>
    this.intersect(new StructSchema(props, this.indexSignature))

  /**
   * Intersects the present Struct Schema with another effectively concatenating their
   * keys. Keys in `this` will be overwritten with identical keys in `that`.
   *
   * **Note:** The index signature of `that` will be discarded.
   *
   * Returns a new `StructSchema`.
   *
   * @since 2.1.0
   */
  public readonly intersect = <T2 extends PropBase>(
    that: StructSchema<T2, any>,
  ): StructSchema<Spread<T, T2>, Ix> =>
    new StructSchema(
      { ...this.props, ...that.props } as Spread<T, T2>,
      this.indexSignature,
    )
}

const OptionFromOptional = <I, O>(
  schema: Schema<I, O>,
): Schema<I | undefined, Option_<NonNullable<O>>> => {
  const guard = deriveGuard(Option(schema))

  return pipe(
    Optional(schema),
    Imap(
      {
        is: (u): u is O.Option<NonNullable<O>> =>
          guard.is(u) &&
          pipe(
            u,
            O.fold(
              () => true,
              a => a !== undefined,
            ),
          ),
      },
      O.fromNullable,
      O.toUndefined,
    ),
  )
}
