/** @since 1.1.0 */
import type * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import { type Schema } from 'schemata-ts/Schema'
import { Array as ArrayS } from 'schemata-ts/schemata/Array'

/**
 * A read-only Array containing one or more elements.
 *
 * @deprecated Use `Array().nonEmpty()` instead
 * @since 1.1.0
 * @category Combinators
 */
export const NonEmptyArray: <A, O>(
  inner: Schema<O, A>,
) => Schema<RNEA.ReadonlyNonEmptyArray<O>, RNEA.ReadonlyNonEmptyArray<A>> = inner =>
  ArrayS(inner, {
    minLength: 1,
  }) as any
