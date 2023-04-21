import { Const, make } from 'fp-ts/Const'
import { pipe, tuple } from 'fp-ts/function'
import * as Mn from 'fp-ts/Monoid'
import * as RA from 'fp-ts/ReadonlyArray'
import * as RR from 'fp-ts/ReadonlyRecord'
import * as Sg from 'fp-ts/Semigroup'
import * as Str from 'fp-ts/string'
import * as JS from 'schemata-ts/internal/json-schema'
import { WithStructM } from 'schemata-ts/schemables/WithStructM/definition'
import { hasImplicitOptional } from 'schemata-ts/struct'

export const WithStructMJsonSchema: WithStructM<JS.SchemableLambda> = {
  structM: (properties, params = { extraProps: 'strip' }) => {
    const [requiredKeys, jsonSchema] = pipe(
      properties,
      RR.foldMapWithIndex(Str.Ord)(
        Mn.tuple(
          RA.getMonoid<string>(),
          RR.getUnionMonoid(Sg.first<Const<JS.JsonSchemaWithDescription, unknown>>()),
        ),
      )((key, { _val }) =>
        tuple(hasImplicitOptional(_val) ? [] : [key], make({ [key]: _val })),
      ),
    )
    return JS.makeStructSchema(
      jsonSchema,
      requiredKeys,
      params.extraProps === 'restParam'
        ? params.restParam
        : params.extraProps === 'error'
        ? false
        : undefined,
    ) as any
  },
}
