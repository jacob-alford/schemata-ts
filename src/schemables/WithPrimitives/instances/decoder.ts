import { flow, pipe } from 'fp-ts/function'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import * as TC from 'schemata-ts/internal/Transcoder'
import { WithPrimitives } from 'schemata-ts/schemables/WithPrimitives/definition'
import { Guard } from 'schemata-ts/schemables/WithPrimitives/instances/guard'

/** @since 2.0.0 */
export const WithPrimitivesTranscoder: WithPrimitives<TC.SchemableLambda> = {
  string: flow(
    Guard.string,
    D.fromGuard(u => TC.transcodeErrors(TC.typeMismatch('string', u))),
  ),
  int: flow(
    Guard.int,
    D.fromGuard(u => TC.transcodeErrors(TC.typeMismatch('int', u))),
  ),
  float: flow(
    Guard.float,
    D.fromGuard(u => TC.transcodeErrors(TC.typeMismatch('float', u))),
  ),
  boolean: pipe(
    Guard.boolean,
    D.fromGuard(u => TC.transcodeErrors(TC.typeMismatch('boolean', u))),
  ),
  unknown: pipe(
    Guard.unknown,
    D.fromGuard(u => TC.transcodeErrors(TC.typeMismatch('unknown', u))),
  ),
  literal: (...literals) =>
    pipe(
      Guard.literal(...(literals as any)),
      D.fromGuard(u =>
        pipe(
          literals,
          RNEA.mapWithIndex((i, literal) =>
            D.errorAtUnionMember(
              i,
              TC.transcodeErrors(TC.typeMismatch(String(literal), u)),
            ),
          ),
          errs => D.decodeErrors(...(errs as any)),
        ),
      ),
    ),
}
