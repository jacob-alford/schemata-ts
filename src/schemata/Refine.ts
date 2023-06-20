/**
 * Used to refine a type to a subtype using a predicate function.
 *
 * @since 1.0.0
 */
import { type Schema, make } from 'schemata-ts/Schema'

/**
 * Used to refine a type to a subtype using a predicate function.
 *
 * @since 1.0.0
 * @category Instances
 */
export const Refine =
  <A, B extends A>(refinement: (a: A) => a is B, refinedName: string) =>
  <I>(from: Schema<I, A>): Schema<I, B> =>
    make(_ => _.refine(refinement, refinedName)(from.runSchema(_)))
