/**
 * SchemableExt instances for TaskDecoder
 *
 * **Warning: DO NOT EDIT, this module is autogenerated**
 *
 * @since 1.0.0
 */
import * as TD from 'schemata-ts/base/TaskDecoderBase'
import { SchemableExt2C } from 'schemata-ts/SchemableExt'
import * as WithAnnotate from 'schemata-ts/schemables/WithAnnotate/instances/task-decoder'
import * as WithBrand from 'schemata-ts/schemables/WithBrand/instances/task-decoder'
import * as WithCheckDigit from 'schemata-ts/schemables/WithCheckDigit/instances/task-decoder'
import * as WithDate from 'schemata-ts/schemables/WithDate/instances/task-decoder'
import * as WithFloat from 'schemata-ts/schemables/WithFloat/instances/task-decoder'
import * as WithInt from 'schemata-ts/schemables/WithInt/instances/task-decoder'
import * as WithInvariant from 'schemata-ts/schemables/WithInvariant/instances/task-decoder'
import * as WithJson from 'schemata-ts/schemables/WithJson/instances/task-decoder'
import * as WithMap from 'schemata-ts/schemables/WithMap/instances/task-decoder'
import * as WithOption from 'schemata-ts/schemables/WithOption/instances/task-decoder'
import * as WithOptional from 'schemata-ts/schemables/WithOptional/instances/task-decoder'
import * as WithPadding from 'schemata-ts/schemables/WithPadding/instances/task-decoder'
import * as WithPattern from 'schemata-ts/schemables/WithPattern/instances/task-decoder'
import * as WithRefine from 'schemata-ts/schemables/WithRefine/instances/task-decoder'
import * as WithStructM from 'schemata-ts/schemables/WithStructM/instances/task-decoder'
import * as WithUnknownContainers from 'schemata-ts/schemables/WithUnknownContainers/instances/task-decoder'
import { interpret } from 'schemata-ts/SchemaExt'
export type {
  /**
   * @since 1.0.0
   * @category Model
   */
  TaskDecoder,
} from 'schemata-ts/base/TaskDecoderBase'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Schemable: SchemableExt2C<TD.URI> = {
  ...TD.Schemable,
  ...WithAnnotate.TaskDecoder,
  ...WithBrand.TaskDecoder,
  ...WithCheckDigit.TaskDecoder,
  ...WithDate.TaskDecoder,
  ...WithFloat.TaskDecoder,
  ...WithInt.TaskDecoder,
  ...WithInvariant.TaskDecoder,
  ...WithJson.TaskDecoder,
  ...WithMap.TaskDecoder,
  ...WithOption.TaskDecoder,
  ...WithOptional.TaskDecoder,
  ...WithPadding.TaskDecoder,
  ...WithPattern.TaskDecoder,
  ...WithRefine.TaskDecoder,
  ...WithStructM.TaskDecoder,
  ...WithUnknownContainers.TaskDecoder,
}

/**
 * @since 1.0.0
 * @category Interpreters
 */
export const getTaskDecoder = interpret(Schemable)
