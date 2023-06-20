/**
 * A read-only Array containing one or more elements.
 *
 * @since 1.1.0
 */
import type * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import { type Schema } from 'schemata-ts/Schema'
import { Array } from 'schemata-ts/schemata/Array'

/**
 * A read-only Array containing one or more elements.
 *
 * @since 1.1.0
 * @category Schema
 */
export const NonEmptyArray: <A, O>(
  sA: Schema<O, A>,
) => Schema<RNEA.ReadonlyNonEmptyArray<O>, RNEA.ReadonlyNonEmptyArray<A>> = Array({
  minLength: 1,
}) as any
