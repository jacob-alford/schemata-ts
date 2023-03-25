import { flow, pipe } from 'fp-ts/function'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import * as D from 'schemata-ts/internal/Decoder'
import { WithPrimitives } from 'schemata-ts/schemables/WithPrimitives/definition'
import { Guard } from 'schemata-ts/schemables/WithPrimitives/instances/guard'

/** @since 2.0.0 */
export const Decoder: WithPrimitives<D.SchemableLambda> = {
  string: flow(
    Guard.string,
    D.fromGuard(u => D.decodeErrors(D.typeMismatch('string', u))),
  ),
  int: flow(
    Guard.int,
    D.fromGuard(u => D.decodeErrors(D.typeMismatch('int', u))),
  ),
  float: flow(
    Guard.float,
    D.fromGuard(u => D.decodeErrors(D.typeMismatch('float', u))),
  ),
  boolean: pipe(
    Guard.boolean,
    D.fromGuard(u => D.decodeErrors(D.typeMismatch('boolean', u))),
  ),
  unknown: pipe(
    Guard.unknown,
    D.fromGuard(u => D.decodeErrors(D.typeMismatch('unknown', u))),
  ),
  literal: (...literals) =>
    pipe(
      Guard.literal(...(literals as any)),
      D.fromGuard(u =>
        pipe(
          literals,
          RNEA.mapWithIndex((i, literal) =>
            D.errorAtUnionMember(i, D.decodeErrors(D.typeMismatch(String(literal), u))),
          ),
          errs => D.decodeErrors(...(errs as any)),
        ),
      ),
    ),
}
