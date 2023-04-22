import * as JS from 'schemata-ts/internal/json-schema'
import { WithAnnotate } from 'schemata-ts/schemables/annotate/definition'

export const AnnotateJsonSchema: WithAnnotate<JS.SchemableLambda> = {
  annotate: JS.addDescription,
}
