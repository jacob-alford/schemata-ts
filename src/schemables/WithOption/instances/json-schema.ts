/**
 * Represents an exclusion of a supplied value where the exclusion is mapped to `None`.
 * Requires an inner schemable, and an Eq instance which defaults to strict equality.
 *
 * @since 1.2.0
 */
import * as JS from 'schemata-ts/base/JsonSchemaBase'
import { WithOption2 } from 'schemata-ts/schemables/WithOption/definition'

/**
 * @since 1.2.0
 * @category Instances
 */
export const JsonSchema: WithOption2<JS.URI> = {
  optionFromExclude: (exclude, jsA) =>
    /*
     * TODO @jacob-alford: Exclude can technically _not_ be a literal value, and that
     * might cause problems if the excluded value is not a valid schema value, such as undefined.
     */
    // @ts-expect-error -- typelevel difference
    JS.makeExclusionSchema(exclude, jsA),
}
