/**
 * WithStructM instance for JsonSchema
 *
 * @since 1.3.0
 */
import { Const, make } from 'fp-ts/Const'
import { pipe, tuple } from 'fp-ts/function'
import * as Mn from 'fp-ts/Monoid'
import * as RA from 'fp-ts/ReadonlyArray'
import * as RR from 'fp-ts/ReadonlyRecord'
import * as Sg from 'fp-ts/Semigroup'
import * as Str from 'fp-ts/string'
import * as JS from 'schemata-ts/JsonSchema'
import { WithStructM } from 'schemata-ts/schemables/WithStructM/definition'
import { isRequiredFlag } from 'schemata-ts/struct'

/**
 * @since 1.3.0
 * @category Instances
 */
export const JsonSchema: WithStructM<JS.SchemableLambda> = {
  structM: (properties, params = { extraProps: 'strip' }) => {
    const [requiredKeys, jsonSchema] = pipe(
      properties,
      RR.foldMapWithIndex(Str.Ord)(
        Mn.tuple(
          RA.getMonoid<string>(),
          RR.getUnionMonoid(Sg.first<Const<JS.JsonSchemaWithDescription, unknown>>()),
        ),
      )((key, { _val, _flag }) =>
        tuple(isRequiredFlag(_flag) ? [key] : [], make({ [key]: _val })),
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
