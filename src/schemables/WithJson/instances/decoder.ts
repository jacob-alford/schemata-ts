/**
 * A basal schemable for Json and JsonString
 *
 * @since 1.1.0
 */
import { pipe } from 'fp-ts/function'
import * as D from 'schemata-ts/Decoder'
import { WithJson } from 'schemata-ts/schemables/WithJson/definition'
import { Guard } from 'schemata-ts/schemables/WithJson/instances/guard'

/**
 * @since 1.1.0
 * @category Instances
 */
export const Decoder: WithJson<D.SchemableLambda> = {
  json: pipe(
    Guard.json,
    D.fromGuard(u => D.liftDecodeError(D.typeMismatch('Json', u))),
  ),
  jsonString: pipe(
    Guard.jsonString,
    D.fromGuard(u => D.liftDecodeError(D.typeMismatch('JsonString', u))),
  ),
}
