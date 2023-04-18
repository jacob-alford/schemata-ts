/**
 * Schemable for annotating a JSON Schema. Interpretation using interpreters other than
 * JsonSchema will not change the derivation.
 *
 * @since 1.2.0
 */
import * as SC from 'schemata-ts/Schema'

/**
 * @since 1.2.0
 * @category Combinators
 */
export const Annotate =
  (params?: { title?: string; description?: string }) =>
  <O, A>(schema: SC.Schema<O, A>): SC.Schema<O, A> =>
    SC.make(s => s.annotate(params)(schema(s)))
