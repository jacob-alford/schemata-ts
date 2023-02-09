/**
 * Represents a ReadonlyMap converted from an expected array of entries.
 *
 * @since 1.0.0
 */
import { pipe } from 'fp-ts/function'
import * as RR from 'fp-ts/ReadonlyRecord'
import { URI } from 'schemata-ts/base/SchemaBase'
import { WithStructM2 } from 'schemata-ts/schemables/WithStructM/definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Schema: WithStructM2<URI>['structM'] =
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
