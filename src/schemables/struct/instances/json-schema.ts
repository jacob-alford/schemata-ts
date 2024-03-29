import { pipe, tuple } from 'fp-ts/function'
import * as Mn from 'fp-ts/Monoid'
import * as RA from 'fp-ts/ReadonlyArray'
import * as RR from 'fp-ts/ReadonlyRecord'
import * as Sg from 'fp-ts/Semigroup'
import * as Str from 'fp-ts/string'
import * as JS from 'schemata-ts/internal/json-schema'
import { hasImplicitOptional } from 'schemata-ts/internal/struct'
import { type WithStruct } from 'schemata-ts/schemables/struct/definition'

export const StructJsonSchema: WithStruct<JS.SchemableLambda> = {
  struct: (properties, extraProps) => {
    const [requiredKeys, jsonSchema] = pipe(
      properties,
      RR.foldMapWithIndex(Str.Ord)(
        Mn.tuple(RA.getMonoid<string>(), RR.getUnionMonoid(Sg.first<JS.JsonSchema>())),
      )((key, { schemable }) =>
        tuple(hasImplicitOptional(schemable) ? [] : [key], { [key]: schemable }),
      ),
    )

    return new JS.JsonStruct(
      jsonSchema,
      requiredKeys,
      extraProps === 'error' ? false : extraProps === 'strip' ? undefined : extraProps,
    ) as any
  },
  record: (keys, so) => JS.make(new JS.JsonStruct({}, [], so, keys)),
  intersection: (x, y) => JS.make(new JS.JsonIntersection([x, y])),
}
