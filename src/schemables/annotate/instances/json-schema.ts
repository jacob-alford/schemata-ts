import { type Const } from 'fp-ts/Const'
import { identity, pipe } from 'fp-ts/function'
import * as JS from 'schemata-ts/internal/json-schema'
import { type WithAnnotate } from 'schemata-ts/schemables/annotate/definition'

export const AnnotateJsonSchema: WithAnnotate<JS.SchemableLambda> = {
  annotate:
    params =>
    <O>(inner: Const<JS.JsonSchema, O>): Const<JS.JsonSchema, O> => {
      const { title, description, references, deprecated, readOnly } = params
      const hasChanged =
        title !== undefined ||
        description !== undefined ||
        deprecated !== undefined ||
        readOnly !== undefined
      return pipe(
        inner,
        hasChanged
          ? JS.addDescription({
              ...(title === undefined ? {} : { title }),
              ...(description === undefined ? {} : { description }),
              ...(deprecated === undefined ? {} : { deprecated }),
              ...(readOnly === undefined ? {} : { readOnly }),
            })
          : identity,
        references !== undefined ? JS.addReferences({ $defs: references }) : identity,
      )
    },
}
