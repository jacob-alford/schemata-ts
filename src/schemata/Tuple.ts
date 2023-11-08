/** @since 1.4.0 */
import { deriveTypeString } from 'schemata-ts/derivations/type-string-schemable'
import { type SchemableKind, type SchemableLambda } from 'schemata-ts/internal/schemable'
import {
  type InputOf,
  type OutputOf,
  type Schema,
  SchemaImplementation,
} from 'schemata-ts/Schema'
import { type Schemable } from 'schemata-ts/Schemable'
import { ArrayTypeString } from 'schemata-ts/schemables/array/instances/type-string'

/**
 * A schema for n-tuples
 *
 * @since 1.0.0
 * @category Combinators
 */
export const Tuple = <T extends ReadonlyArray<Schema<any, any>>>(
  ...items: T
): TupleSchema<T> => new TupleSchema(items)

type Input<T extends ReadonlyArray<Schema<any, any>>> = {
  readonly [K in keyof T]: InputOf<T[K]>
}

type Output<T extends ReadonlyArray<Schema<any, any>>> = {
  readonly [K in keyof T]: OutputOf<T[K]>
}

/**
 * The TupleSchema transformer class, use instead `Tuple` function
 *
 * @since 2.2.0
 * @category Transformations
 */
export class TupleSchema<
  T extends ReadonlyArray<Schema<any>>,
> extends SchemaImplementation<Input<T>, Output<T>> {
  constructor(private readonly items: T) {
    const name = ArrayTypeString.tuple('', ...items.map(deriveTypeString))[0]
    super(
      <S extends SchemableLambda>(s: Schemable<S>) =>
        s.tuple(name, ...items.map(schema => schema.runSchema(s))) as SchemableKind<
          S,
          Input<T>,
          Output<T>
        >,
    )
  }

  /**
   * Appends items to the end of the tuple
   *
   * @since 2.2.0
   */
  public readonly append = <U extends ReadonlyArray<Schema<any>>>(
    ...items: U
  ): TupleSchema<readonly [...T, ...U]> => new TupleSchema([...this.items, ...items])

  /**
   * Prepends items to the beginning of the tuple
   *
   * @since 2.2.0
   */
  public readonly prepend = <U extends ReadonlyArray<Schema<any>>>(
    ...items: U
  ): TupleSchema<readonly [...U, ...T]> => new TupleSchema([...items, ...this.items])
}
