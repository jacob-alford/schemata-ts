/** @since 2.0.0 */
import { pipe, unsafeCoerce } from 'fp-ts/function'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import { deriveGuard } from 'schemata-ts/derivations/guard-schemable'
import { deriveInformation } from 'schemata-ts/derivations/information-schemable'
import { deriveTypeString } from 'schemata-ts/derivations/type-string-schemable'
import { make } from 'schemata-ts/internal/schema'
import { type ImplicitOptional } from 'schemata-ts/internal/struct'
import { type Schema } from 'schemata-ts/Schema'
import { type TupleToUnion } from 'type-fest'

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
 * Represents a union of different types. **Note: Union items ought to be mutually
 * exclusive**. To mitigate this, union items are first sorted from most complex to least
 * complex, and in the case of transcoder and guard the first match is kept.
 *
 * @since 2.0.0
 * @category Combinators
 */
export const Union = <T extends RNEA.ReadonlyNonEmptyArray<Schema<any, any>>>(
  ...members: T
): IncludesExtension<T, ImplicitOptional> extends true
  ? ImplicitOptional & Schema<TupleToUnion<Inputs<T>>, TupleToUnion<Outputs<T>>>
  : Schema<TupleToUnion<Inputs<T>>, TupleToUnion<Outputs<T>>> => {
  return unsafeCoerce(
    make(s =>
      pipe(
        members,
        RNEA.map(schema => ({
          guard: deriveGuard(schema),
          precedence: deriveInformation(schema),
          name: deriveTypeString(schema)[0],
          member: schema.runSchema(s),
        })),
        guardedUnionMembers => s.guardedUnion(...(guardedUnionMembers as any)),
      ),
    ),
  )
}
