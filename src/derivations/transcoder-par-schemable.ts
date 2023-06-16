/**
 * Schemable instances for TranscoderPar
 *
 * **Warning: DO NOT EDIT, this module is autogenerated**
 *
 * @since 2.0.0
 */
import * as TCP from 'schemata-ts/internal/transcoder-par'
import { interpret } from 'schemata-ts/Schema'
import { Schemable } from 'schemata-ts/Schemable'
import * as annotate from 'schemata-ts/schemables/annotate/instances/transcoder-par'
import * as array from 'schemata-ts/schemables/array/instances/transcoder-par'
import * as checkDigit from 'schemata-ts/schemables/check-digit/instances/transcoder-par'
import * as clone from 'schemata-ts/schemables/clone/instances/transcoder-par'
import * as date from 'schemata-ts/schemables/date/instances/transcoder-par'
import * as guardedUnion from 'schemata-ts/schemables/guarded-union/instances/transcoder-par'
import * as invariant from 'schemata-ts/schemables/invariant/instances/transcoder-par'
import * as map from 'schemata-ts/schemables/map/instances/transcoder-par'
import * as optional from 'schemata-ts/schemables/optional/instances/transcoder-par'
import * as padding from 'schemata-ts/schemables/padding/instances/transcoder-par'
import * as parser from 'schemata-ts/schemables/parser/instances/transcoder-par'
import * as pattern from 'schemata-ts/schemables/pattern/instances/transcoder-par'
import * as primitives from 'schemata-ts/schemables/primitives/instances/transcoder-par'
import * as refine from 'schemata-ts/schemables/refine/instances/transcoder-par'
import * as struct from 'schemata-ts/schemables/struct/instances/transcoder-par'

/**
 * @since 2.0.0
 * @category Instances
 */
const TranscoderParSchemable: Schemable<TCP.SchemableLambda> = {
  ...annotate.AnnotateTranscoderPar,
  ...array.ArrayTranscoderPar,
  ...checkDigit.CheckDigitTranscoderPar,
  ...clone.CloneTranscoderPar,
  ...date.DateTranscoderPar,
  ...guardedUnion.GuardedUnionTranscoderPar,
  ...invariant.InvariantTranscoderPar,
  ...map.MapTranscoderPar,
  ...optional.OptionalTranscoderPar,
  ...padding.PaddingTranscoderPar,
  ...parser.ParserTranscoderPar,
  ...pattern.PatternTranscoderPar,
  ...primitives.PrimitivesTranscoderPar,
  ...refine.RefineTranscoderPar,
  ...struct.StructTranscoderPar,
}

/**
 * @since 2.0.0
 * @category Interpreters
 */
export const getTranscoderPar = interpret(TranscoderParSchemable)
