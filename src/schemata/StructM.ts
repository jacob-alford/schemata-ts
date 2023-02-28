/**
 * WithStructM instance for Schema
 *
 * @since 1.3.0
 */
import { pipe } from 'fp-ts/function'
import * as RR from 'fp-ts/ReadonlyRecord'
import * as _ from 'schemata-ts/internal/schema-utils'
import { Combine } from 'schemata-ts/internal/type-utils'
import { Schema } from 'schemata-ts/Schema'
import { StructOptions } from 'schemata-ts/schemables/WithStructM/definition'
import { KeyNotMapped, Prop } from 'schemata-ts/struct'

type SchemataOf<T extends Record<string, { _val: Schema<any, any> }>> = {
  [K in keyof T]: T[K]['_val']
}

/**
 * @since 1.3.0
 * @category Instances
 */
export const StructM: <
  Props extends Record<
    string,
    Prop<SchemableLambda, Schema<any, any>, string | KeyNotMapped>
  >,
  RestKind extends Schema<any, any> | undefined,
>(
  properties: Props,
  params?: StructOptions<RestKind>,
) => Schema<
  Combine<
    _.RestInput<RestKind> &
      _.RequiredInputProps<SchemataOf<Props>> &
      _.OptionalInputProps<SchemataOf<Props>>
  >,
  Combine<_.RestOutput<RestKind> & _.OutputProps<SchemataOf<Props>>>
> =
  (properties, params = { extraProps: 'strip' }) =>
  S => {
    const schemafiedProps = pipe(
      properties,
      RR.map(({ _val, ...rest }) => ({ _val: _val(S), ...rest })),
    )
    if (params.extraProps === 'restParam' && params.restParam !== undefined) {
      return S.structM(schemafiedProps, {
        extraProps: 'restParam',
        restParam: params.restParam(S),
      })
    }
    return S.structM(schemafiedProps, params as any) as any
  }
