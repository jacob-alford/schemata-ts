import * as JS from 'schemata-ts/internal/json-schema'
import { WithAnnotate } from 'schemata-ts/schemables/WithAnnotate/definition'

export const WithAnnotateJsonSchema: WithAnnotate<JS.SchemableLambda> = {
  annotate: JS.addDescription,
}
