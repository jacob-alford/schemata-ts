/**
 * Represents an exclusion of a supplied value where the exclusion is mapped to `None`.
 * Requires an inner schemable, and an Eq instance which defaults to strict equality.
 *
 * @since 1.2.0
 */
import * as JS from '../../../base/JsonSchemaBase'
import { WithOption2 } from '../definition'

/**
 * @since 1.2.0
 * @category Instances
 */
export const JsonSchema: WithOption2<JS.URI> = {
  optionFromExclude: (exclude, jsA) =>
    /*
     * TODO @jacob-alford: Exclude can technically _not_ be a literal value, and that
     * might cause problems with non-literal types turning into `boolean`s with the way
     * `literal` is constructed
     */
    // @ts-expect-error -- typelevel difference
    JS.makeUnionSchema(JS.makeLiteralSchema(exclude), jsA),
}
