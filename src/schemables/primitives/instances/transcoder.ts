import { flow, identity, pipe } from 'fp-ts/function'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import * as TC from 'schemata-ts/internal/transcoder'
import { WithPrimitives } from 'schemata-ts/schemables/primitives/definition'
import { PrimitivesGuard as Guard } from 'schemata-ts/schemables/primitives/instances/guard'

/** @since 2.0.0 */
export const PrimitivesTranscoder: WithPrimitives<TC.SchemableLambda> = {
  string: flow(
    Guard.string,
    TC.fromGuard(identity, u => TC.transcodeErrors(TC.typeMismatch('string', u))),
  ),
  int: flow(
    Guard.int,
    TC.fromGuard(identity, u => TC.transcodeErrors(TC.typeMismatch('int', u))),
  ),
  float: flow(
    Guard.float,
    TC.fromGuard(identity, u => TC.transcodeErrors(TC.typeMismatch('float', u))),
  ),
  boolean: pipe(
    Guard.boolean,
    TC.fromGuard(identity, u => TC.transcodeErrors(TC.typeMismatch('boolean', u))),
  ),
  unknown: pipe(
    Guard.unknown,
    TC.fromGuard(identity, u => TC.transcodeErrors(TC.typeMismatch('unknown', u))),
  ),
  literal: (...literals) =>
    pipe(
      Guard.literal(...(literals as any)),
      TC.fromGuard(identity, u =>
        pipe(
          literals,
          RNEA.mapWithIndex((i, literal) =>
            TC.errorAtUnionMember(
              i,
              TC.transcodeErrors(TC.typeMismatch(String(literal), u)),
            ),
          ),
          errs => TC.transcodeErrors(...(errs as any)),
        ),
      ),
    ),
}
