import { tuple } from 'fp-ts/function'
import * as TS from 'schemata-ts/internal/type-string'
import { type WithAnnotate } from 'schemata-ts/schemables/annotate/definition'

export const AnnotateTypeString: WithAnnotate<TS.SchemableLambda> = {
  annotate: (params = {}) => {
    const { typeString } = params
    return inner =>
      typeString === undefined
        ? inner
        : typeof typeString === 'string'
        ? TS.makeTypeString(tuple(typeString, typeString))
        : TS.makeTypeString(typeString)
  },
}
