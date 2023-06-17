/**
 * Represents a union of mutually exclusive schemas
 *
 * @since 2.0.0
 */
import { pipe } from 'fp-ts/function'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import { getGuard } from 'schemata-ts/derivations/guard-schemable'
import { getInformation } from 'schemata-ts/derivations/information-schemable'
import { InputOf, make, OutputOf, Schema } from 'schemata-ts/Schema'

type Unique_<
  Sample extends ReadonlyArray<any>,
  SampleCopy = Sample,
  AlreadyFound = never,
> = Sample extends [infer Head, ...infer Tail]
  ? Head extends AlreadyFound
    ? { error: `arguments not unique`; at: Head }
    : Unique_<Tail, SampleCopy, AlreadyFound | Head>
  : SampleCopy

type Unique<Xs extends ReadonlyArray<any>> = Unique_<Xs>

type Inputs<Xs extends ReadonlyArray<Schema<any, any>>> = {
  [K in keyof Xs]: InputOf<Xs[K]>
}

/**
 * Represents a union of mutually exclusive schemas. Union elements must be unique to
 * prevent lossly operations on similar types.
 *
 * @since 2.0.0
 */
export const Union = <
  T extends RNEA.ReadonlyNonEmptyArray<Schema<any, any>>,
  UniquenessCheck extends Unique<Inputs<T>>,
>(
  name: string,
  ...members: UniquenessCheck extends { error: string } ? UniquenessCheck : T
): Schema<InputOf<T[number]>, OutputOf<T[number]>> =>
  make(s =>
    pipe(
      members,
      RNEA.map(schema => ({
        guard: getGuard(schema),
        precedence: getInformation(schema),
        member: schema(s),
      })),
      guardedUnionMembers => s.guardedUnion(name, ...(guardedUnionMembers as any)),
    ),
  )