import { type Const } from 'fp-ts/Const'
import { identity, pipe } from 'fp-ts/function'
import * as JS from 'schemata-ts/internal/json-schema'
import { type WithAnnotate } from 'schemata-ts/schemables/annotate/definition'

export const AnnotateJsonSchema: WithAnnotate<JS.SchemableLambda> = {
  annotate:
    params =>
    <O>(inner: Const<JS.JsonSchema, O>): Const<JS.JsonSchema, O> => {
      const { title, description, references, deprecated } = params
      if (title === undefined && description === undefined && references === undefined)
        return inner
      return pipe(
        inner,
        title !== undefined || description !== undefined
          ? JS.addDescription({
              ...(title === undefined ? {} : { title }),
              ...(description === undefined ? {} : { description }),
              ...(deprecated === undefined ? {} : { deprecated }),
            })
          : identity,
        references !== undefined ? JS.addReferences({ $defs: references }) : identity,
      )
    },
}
