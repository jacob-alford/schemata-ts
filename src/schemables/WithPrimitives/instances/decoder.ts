import { flow, pipe } from 'fp-ts/function'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import * as D from 'schemata-ts/Decoder'
import { WithPrimitives } from 'schemata-ts/schemables/WithPrimitives/definition'
import { Guard } from 'schemata-ts/schemables/WithPrimitives/instances/guard'

/** @since 2.0.0 */
export const Decoder: WithPrimitives<D.SchemableLambda> = {
  string: flow(
    Guard.string,
    D.fromGuard(u => D.typeMismatch('String', u)),
  ),
  int: flow(
    Guard.int,
    D.fromGuard(u => D.typeMismatch('Int', u)),
  ),
  float: flow(
    Guard.float,
    D.fromGuard(u => D.typeMismatch('Float', u)),
  ),
  boolean: pipe(
    Guard.boolean,
    D.fromGuard(u => D.typeMismatch('Boolean', u)),
  ),
  unknown: pipe(
    Guard.unknown,
    D.fromGuard(u => D.typeMismatch('Unknown', u)),
  ),
  literal: (...literals) =>
    pipe(
      Guard.literal(...(literals as any)),
      D.fromGuard(u =>
        pipe(
          literals,
          RNEA.chainWithIndex((i, literal) =>
            D.errorAtUnionMember(i, D.typeMismatch(String(literal), u)),
          ),
        ),
      ),
    ),
}
