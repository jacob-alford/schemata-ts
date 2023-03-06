/**
 * Represents an exclusion of a supplied value where the exclusion is mapped to `None`.
 * Requires an inner schemable, and an Eq instance which defaults to strict equality.
 *
 * @since 1.2.0
 */
import * as JS from 'schemata-ts/JsonSchema'
import { WithOption } from 'schemata-ts/schemables/WithOption/definition'

/**
 * @since 1.2.0
 * @category Instances
 */
export const JsonSchema: WithOption<JS.SchemableLambda> = {
  optionFromExclude: (exclude, jsA) =>
    /*
     * TODO @jacob-alford: Exclude can technically _not_ be a literal value, and that
     * might cause problems if the excluded value is not a valid schema value, such as undefined.
     */
    // @ts-expect-error -- typelevel difference
    JS.makeExclusionSchema(exclude, jsA),
}
