import { pipe } from 'fp-ts/function'
import * as N from 'fp-ts/number'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import * as RR from 'fp-ts/ReadonlyRecord'
import * as Str from 'fp-ts/string'
import * as Inf from 'schemata-ts/internal/information'
import { type WithStruct } from 'schemata-ts/schemables/struct/definition'
import { remapPropertyKeys } from 'schemata-ts/schemables/struct/utils'

export const StructInformation: WithStruct<Inf.SchemableLambda> = {
  struct: properties =>
    pipe(
      remapPropertyKeys(properties),
      RR.foldMap(Str.Ord)(N.MonoidProduct)(
        RNEA.foldMap(N.SemigroupSum)(({ precedence }) => precedence),
      ),
      _ => Inf.makeInformation(_),
    ),
  record: (key, codomain) => pipe(Math.max(key, codomain), _ => Inf.makeInformation(_)),
  intersection: (x, y) => Inf.makeInformation(x * y - Math.min(x, y)),
}
