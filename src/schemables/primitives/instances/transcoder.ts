import { identity, pipe } from 'fp-ts/function'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import * as TC from 'schemata-ts/internal/transcoder'
import { type WithPrimitives } from 'schemata-ts/schemables/primitives/definition'
import { PrimitivesGuard as Guard } from 'schemata-ts/schemables/primitives/instances/guard'
import {
  getLengthBoundsString,
  getNumberBoundsInt,
} from 'schemata-ts/schemables/primitives/utils'

/** @since 2.0.0 */
export const PrimitivesTranscoder: WithPrimitives<TC.SchemableLambda> = {
  string: _ =>
    pipe(
      _,
      Guard.string,
      TC.fromGuard(identity, u =>
        TC.transcodeErrors(TC.typeMismatch(`string${getLengthBoundsString(_)}`, u)),
      ),
    ),
  int: _ =>
    pipe(
      _,
      Guard.int,
      TC.fromGuard(identity, u =>
        TC.transcodeErrors(TC.typeMismatch(`Integer${getNumberBoundsInt(_)}`, u)),
      ),
    ),
  float: _ =>
    pipe(
      _,
      Guard.float,
      TC.fromGuard(identity, u =>
        TC.transcodeErrors(TC.typeMismatch(`Float${getNumberBoundsInt(_)}`, u)),
      ),
    ),
  boolean: pipe(
    Guard.boolean,
    TC.fromGuard(identity, u => TC.transcodeErrors(TC.typeMismatch('boolean', u))),
  ),
  unknown: { decode: TC.success, encode: TC.success },
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
