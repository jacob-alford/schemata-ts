import * as JS from 'schemata-ts/internal/json-schema'
import { WithOption } from 'schemata-ts/schemables/option/definition'

export const OptionJsonSchema: WithOption<JS.SchemableLambda> = {
  optionFromExclude: (exclude, jsA) =>
    /*
     * TODO @jacob-alford: Exclude can technically _not_ be a literal value, and that
     * might cause problems if the excluded value is not a valid schema value, such as undefined.
     */
    // @ts-expect-error -- typelevel difference
    JS.makeExclusionSchema(exclude, jsA),
}
