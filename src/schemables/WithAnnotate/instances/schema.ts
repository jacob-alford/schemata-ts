/**
 * Schemable for annotating a JSON Schema. Interpretation using interpreters other than
 * JsonSchema will not change the derivation.
 *
 * @since 1.2.0
 */
import * as SC from '../../../SchemaExt'

/**
 * @since 1.2.0
 * @category Combinators
 */
export const Schema =
  (title?: string, description?: string) =>
  <O, A>(schema: SC.SchemaExt<O, A>): SC.SchemaExt<O, A> =>
    SC.make(s => s.annotate(title, description)(schema(s)))
