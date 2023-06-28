import { identity, pipe } from 'fp-ts/function'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import * as TC from 'schemata-ts/internal/transcoder'
import { type WithPrimitives } from 'schemata-ts/schemables/primitives/definition'
import { PrimitivesGuard as Guard } from 'schemata-ts/schemables/primitives/instances/guard'
import { PrimitivesTypeString } from 'schemata-ts/schemables/primitives/instances/type-string'

export const PrimitivesTranscoder: WithPrimitives<TC.SchemableLambda> = {
  string: _ =>
    pipe(
      _,
      Guard.string,
      TC.fromGuard(identity, u =>
        TC.transcodeErrors(
          TC.typeMismatch(_?.errorName ?? PrimitivesTypeString.string(_)[0], u),
        ),
      ),
    ),
  int: _ =>
    pipe(
      _,
      Guard.int,
      TC.fromGuard(identity, u =>
        TC.transcodeErrors(
          TC.typeMismatch(_?.errorName ?? PrimitivesTypeString.int(_)[0], u),
        ),
      ),
    ),
  float: _ =>
    pipe(
      _,
      Guard.float,
      TC.fromGuard(identity, u =>
        TC.transcodeErrors(
          TC.typeMismatch(_?.errorName ?? PrimitivesTypeString.float(_)[0], u),
        ),
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
