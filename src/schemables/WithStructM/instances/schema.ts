/**
 * Represents a ReadonlyMap converted from an expected array of entries.
 *
 * @since 1.0.0
 */
import { identity, pipe } from 'fp-ts/function'
import { Kind2 } from 'fp-ts/HKT'
import * as RR from 'fp-ts/ReadonlyRecord'
import { URI } from 'schemata-ts/base/SchemaBase'
import {
  KeyFlag,
  KeyNotMapped,
  Prop2,
  StructTools,
  structTools,
  WithStructM2,
} from 'schemata-ts/schemables/WithStructM/definition'

/**
 * A tool for reusing struct definitions across multiple struct combinators
 *
 * @since 1.3.0
 * @category Constructors
 */
export const defineStruct: <
  Props extends Record<
    string,
    Prop2<KeyFlag, URI, Kind2<URI, unknown, unknown>, string | KeyNotMapped>
  >,
>(
  makeProps: (_: StructTools) => Props,
) => (_: StructTools) => Props = identity

/**
 * @since 1.0.0
 * @category Instances
 */
export const Schema: WithStructM2<URI>['structM'] =
  (makeProps, params = { extraProps: 'strip' }) =>
  S => {
    const properties = makeProps(structTools)
    const schemafiedProps = pipe(
      properties,
      RR.map(({ _val, ...rest }) => ({ _val: _val(S), ...rest })),
    )
    if (params.extraProps === 'restParam' && params.restParam !== undefined) {
      return S.structM(() => schemafiedProps, {
        extraProps: 'restParam',
        restParam: params.restParam(S),
      })
    }
    return S.structM(() => schemafiedProps, params as any) as any
  }
