/**
 * The extended Schemable typeclass
 *
 * **Warning: DO NOT EDIT, this module is autogenerated**
 *
 * @since 1.0.0
 */
import { SchemableLambda } from 'schemata-ts/HKT'
import { WithAnnotate } from 'schemata-ts/schemables/annotate/definition'
import { WithArray } from 'schemata-ts/schemables/array/definition'
import { WithCheckDigit } from 'schemata-ts/schemables/check-digit/definition'
import { WithDate } from 'schemata-ts/schemables/date/definition'
import { WithGuardedUnion } from 'schemata-ts/schemables/guarded-union/definition'
import { WithInvariant } from 'schemata-ts/schemables/invariant/definition'
import { WithMap } from 'schemata-ts/schemables/map/definition'
import { WithOption } from 'schemata-ts/schemables/option/definition'
import { WithOptional } from 'schemata-ts/schemables/optional/definition'
import { WithPadding } from 'schemata-ts/schemables/padding/definition'
import { WithPattern } from 'schemata-ts/schemables/pattern/definition'
import { WithPrimitives } from 'schemata-ts/schemables/primitives/definition'
import { WithRefine } from 'schemata-ts/schemables/refine/definition'
import { WithStructM } from 'schemata-ts/schemables/struct-m/definition'

/**
 * @since 2.0.0
 * @category Instances
 */
export interface Schemable<S extends SchemableLambda>
  extends WithAnnotate<S>,
    WithArray<S>,
    WithCheckDigit<S>,
    WithDate<S>,
    WithGuardedUnion<S>,
    WithInvariant<S>,
    WithMap<S>,
    WithOption<S>,
    WithOptional<S>,
    WithPadding<S>,
    WithPattern<S>,
    WithPrimitives<S>,
    WithRefine<S>,
    WithStructM<S> {}
