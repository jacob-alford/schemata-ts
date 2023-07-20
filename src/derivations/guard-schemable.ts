/**
 * Schemable instances for Guard
 *
 * **Warning: DO NOT EDIT, this module is autogenerated**
 *
 * @since 2.0.0
 */
import type * as G from 'schemata-ts/internal/guard'
import { interpret } from 'schemata-ts/Schema'
import { type Schemable } from 'schemata-ts/Schemable'
import * as annotate from 'schemata-ts/schemables/annotate/instances/guard'
import * as array from 'schemata-ts/schemables/array/instances/guard'
import * as checkDigit from 'schemata-ts/schemables/check-digit/instances/guard'
import * as clone from 'schemata-ts/schemables/clone/instances/guard'
import * as date from 'schemata-ts/schemables/date/instances/guard'
import * as guardedUnion from 'schemata-ts/schemables/guarded-union/instances/guard'
import * as invariant from 'schemata-ts/schemables/invariant/instances/guard'
import * as lazy from 'schemata-ts/schemables/lazy/instances/guard'
import * as map from 'schemata-ts/schemables/map/instances/guard'
import * as optional from 'schemata-ts/schemables/optional/instances/guard'
import * as parser from 'schemata-ts/schemables/parser/instances/guard'
import * as pattern from 'schemata-ts/schemables/pattern/instances/guard'
import * as primitives from 'schemata-ts/schemables/primitives/instances/guard'
import * as refine from 'schemata-ts/schemables/refine/instances/guard'
import * as struct from 'schemata-ts/schemables/struct/instances/guard'

/**
 * @since 2.0.0
 * @category Instances
 */
const GuardSchemable: Schemable<G.SchemableLambda> = {
  ...annotate.AnnotateGuard,
  ...array.ArrayGuard,
  ...checkDigit.CheckDigitGuard,
  ...clone.CloneGuard,
  ...date.DateGuard,
  ...guardedUnion.GuardedUnionGuard,
  ...invariant.InvariantGuard,
  ...lazy.LazyGuard,
  ...map.MapGuard,
  ...optional.OptionalGuard,
  ...parser.ParserGuard,
  ...pattern.PatternGuard,
  ...primitives.PrimitivesGuard,
  ...refine.RefineGuard,
  ...struct.StructGuard,
}

/**
 * @since 2.0.0
 * @category Interpreters
 */
export const deriveGuard = interpret(GuardSchemable)
