import { pipe, tuple } from 'fp-ts/function'
import * as Mn from 'fp-ts/Monoid'
import * as RA from 'fp-ts/ReadonlyArray'
import * as RR from 'fp-ts/ReadonlyRecord'
import * as Sg from 'fp-ts/Semigroup'
import * as Str from 'fp-ts/string'
import * as JS from 'schemata-ts/internal/json-schema'
import { type WithStruct } from 'schemata-ts/schemables/struct/definition'
import { hasImplicitOptional } from 'schemata-ts/struct'

export const StructJsonSchema: WithStruct<JS.SchemableLambda> = {
  struct: (properties, extraProps = 'strip') => {
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
      extraProps === 'error' ? false : undefined,
    ) as any
  },
}
