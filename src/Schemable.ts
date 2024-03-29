/**
 * The Schemata-ts Schemable typeclass
 *
 * **Warning: DO NOT EDIT, this module is autogenerated**
 *
 * @since 1.0.0
 */
import { type SchemableLambda } from 'schemata-ts/internal/schemable'
import { type WithAnnotate } from 'schemata-ts/schemables/annotate/definition'
import { type WithArray } from 'schemata-ts/schemables/array/definition'
import { type WithCheckDigit } from 'schemata-ts/schemables/check-digit/definition'
import { type WithClone } from 'schemata-ts/schemables/clone/definition'
import { type WithDate } from 'schemata-ts/schemables/date/definition'
import { type WithGuardedUnion } from 'schemata-ts/schemables/guarded-union/definition'
import { type WithInvariant } from 'schemata-ts/schemables/invariant/definition'
import { type WithLazy } from 'schemata-ts/schemables/lazy/definition'
import { type WithMap } from 'schemata-ts/schemables/map/definition'
import { type WithOptional } from 'schemata-ts/schemables/optional/definition'
import { type WithParser } from 'schemata-ts/schemables/parser/definition'
import { type WithPattern } from 'schemata-ts/schemables/pattern/definition'
import { type WithPrimitives } from 'schemata-ts/schemables/primitives/definition'
import { type WithRefine } from 'schemata-ts/schemables/refine/definition'
import { type WithStruct } from 'schemata-ts/schemables/struct/definition'

/**
 * @since 2.0.0
 * @category Instances
 */
export interface Schemable<S extends SchemableLambda>
  extends WithAnnotate<S>,
    WithArray<S>,
    WithCheckDigit<S>,
    WithClone<S>,
    WithDate<S>,
    WithGuardedUnion<S>,
    WithInvariant<S>,
    WithLazy<S>,
    WithMap<S>,
    WithOptional<S>,
    WithParser<S>,
    WithPattern<S>,
    WithPrimitives<S>,
    WithRefine<S>,
    WithStruct<S> {}
