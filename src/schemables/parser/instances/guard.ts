import * as E from 'fp-ts/Either'
import { identity, pipe } from 'fp-ts/function'
import * as J from 'fp-ts/Json'
import * as G from 'schemata-ts/internal/guard'
import { JsonString, WithParser } from 'schemata-ts/schemables/parser/definition'
import { PrimitivesGuard } from 'schemata-ts/schemables/primitives/instances/guard'
import { RefineGuard } from 'schemata-ts/schemables/refine/instances/guard'

export const ParserGuard: WithParser<G.SchemableLambda> = {
  parse: () => identity,
  jsonString: pipe(
    PrimitivesGuard.string(),
    RefineGuard.refine(
      (str): str is JsonString => pipe(J.parse(str), E.isRight),
      'JsonString',
    ),
  ),
}
