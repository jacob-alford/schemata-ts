/**
 * Represents a union of mutually exclusive schemas
 *
 * @since 2.0.0
 */
import { pipe, unsafeCoerce } from 'fp-ts/function'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import { getGuard } from 'schemata-ts/derivations/guard-schemable'
import { getInformation } from 'schemata-ts/derivations/information-schemable'
import { type Schema, make } from 'schemata-ts/Schema'
import { type ImplicitOptional } from 'schemata-ts/struct'
import { type TupleToUnion } from 'type-fest'

type Unique_<Sample, SampleCopy = Sample, AlreadyFound = never> = Sample extends [
  infer Head,
  ...infer Tail,
]
  ? Head extends AlreadyFound
    ? [{ error: `arguments not unique`; at: Head }]
    : Unique_<Tail, SampleCopy, AlreadyFound | Head>
  : SampleCopy

type Unique<Xs> = Unique_<Xs>

type Inputs<Xs extends ReadonlyArray<Schema<any, any>>> = {
  [K in keyof Xs]: Xs[K] extends ImplicitOptional & Schema<infer I, any>
    ? I
    : Xs[K] extends Schema<infer I, any>
    ? I
    : never
}

type Outputs<Xs extends ReadonlyArray<Schema<any, any>>> = {
  [K in keyof Xs]: Xs[K] extends ImplicitOptional & Schema<any, infer O>
    ? O
    : Xs[K] extends Schema<any, infer O>
    ? O
    : never
}

type IncludesExtension<Value extends ReadonlyArray<any>, Item> = Value extends readonly [
  Value[0],
  ...infer rest,
]
  ? Value[0] extends Item
    ? true
    : false extends true
    ? true
    : IncludesExtension<rest, Item>
  : false

/**
 * Represents a union of mutually exclusive schemas. Union elements must be unique to
 * prevent lossly operations on similar types.
 *
 * @since 2.0.0
 */
export const Union =
  (name: string) =>
  <
    T extends RNEA.ReadonlyNonEmptyArray<Schema<any, any>>,
    UniquenessCheck extends Unique<Inputs<T>>,
  >(
    ...members: UniquenessCheck extends { error: string } ? never : T
  ): IncludesExtension<T, ImplicitOptional> extends true
    ? ImplicitOptional & Schema<TupleToUnion<Inputs<T>>, TupleToUnion<Outputs<T>>>
    : Schema<TupleToUnion<Inputs<T>>, TupleToUnion<Outputs<T>>> =>
    unsafeCoerce(
      make(s =>
        pipe(
          members,
          RNEA.map(schema => ({
            guard: getGuard(schema),
            precedence: getInformation(schema),
            member: schema.runSchema(s),
          })),
          guardedUnionMembers => s.guardedUnion(name, ...(guardedUnionMembers as any)),
        ),
      ),
    )
