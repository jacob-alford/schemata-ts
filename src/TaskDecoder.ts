/**
 * SchemableExt instances for TaskDecoder
 *
 * **Warning: DO NOT EDIT, this module is autogenerated**
 *
 * @since 1.0.0
 */
export type {
  /**
   * @since 1.0.0
   * @category Model
   */
  TaskDecoder,
} from './base/TaskDecoderBase'
import * as TD from './base/TaskDecoderBase'
import { SchemableExt2C } from './SchemableExt'

/** Schemables */
import * as WithBrand from './schemables/WithBrand/instances/task-decoder'
import * as WithCheckDigit from './schemables/WithCheckDigit'
import * as WithDate from './schemables/WithDate'
import * as WithFloat from './schemables/WithFloat'
import * as WithInt from './schemables/WithInt'
import * as WithInvariant from './schemables/WithInvariant'
import * as WithMap from './schemables/WithMap'
import * as WithOption from './schemables/WithOption'
import * as WithOptional from './schemables/WithOptional'
import * as WithPadding from './schemables/WithPadding'
import * as WithPattern from './schemables/WithPattern'
import * as WithRefine from './schemables/WithRefine'
import * as WithUnknownContainers from './schemables/WithUnknownContainers'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Schemable: SchemableExt2C<TD.URI> = {
  ...TD.Schemable,
  ...WithBrand.TaskDecoder,
  ...WithCheckDigit.TaskDecoder,
  ...WithDate.TaskDecoder,
  ...WithFloat.TaskDecoder,
  ...WithInt.TaskDecoder,
  ...WithInvariant.TaskDecoder,
  ...WithMap.TaskDecoder,
  ...WithOption.TaskDecoder,
  ...WithOptional.TaskDecoder,
  ...WithPadding.TaskDecoder,
  ...WithPattern.TaskDecoder,
  ...WithRefine.TaskDecoder,
  ...WithUnknownContainers.TaskDecoder,
}
