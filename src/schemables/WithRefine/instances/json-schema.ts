/** @since 1.2.0 */
import { identity } from 'fp-ts/function'

import * as JS from '../../../base/JsonSchemaBase'
import { WithRefine2 } from '../definition'

/**
 * @since 1.2.0
 * @category Instances
 */
export const JsonSchema: WithRefine2<JS.URI> = {
  refine: () => identity,
}
