import { Const } from 'fp-ts/Const'
import { identity, pipe } from 'fp-ts/function'
import * as JS from 'schemata-ts/internal/json-schema'
import { WithAnnotate } from 'schemata-ts/schemables/annotate/definition'

export const AnnotateJsonSchema: WithAnnotate<JS.SchemableLambda> = {
  annotate:
    (params = {}) =>
    <O>(inner: Const<JS.JsonSchema, O>): Const<JS.JsonSchema, O> => {
      const { title, description, references } = params
      if (title === undefined && description === undefined && references === undefined)
        return inner
      return pipe(
        inner,
        title !== undefined || description !== undefined
          ? JS.addDescription({
              ...(title === undefined ? {} : { title }),
              ...(description === undefined ? {} : { description }),
            })
          : identity,
        references !== undefined ? JS.addReferences({ $defs: references }) : identity,
      )
    },
}
