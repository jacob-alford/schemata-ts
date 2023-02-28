/**
 * Schemable for mapping a struct
 *
 * @since 1.3.0
 */
import { Kind, TypeLambda } from 'schemata-ts/HKT'
import { Combine } from 'schemata-ts/internal/type-utils'
import * as _ from 'schemata-ts/schemables/WithStructM/type-utils'
import { KeyFlag, KeyNotMapped, Prop } from 'schemata-ts/struct'

/**
 * Mapped struct configuration determining how to handle extra (non-specified) fields.
 * Default is to strip additional params.
 *
 * Options:
 *
 * - `restParam` - add a rest parameter to the struct
 * - `error` - decode to an error with extra params
 * - `strip` - strips additional params
 *
 * @since 1.3.0
 * @category Model
 */
export type StructOptions<RestKind> =
  | StructWithRestParam<RestKind>
  | StrictStruct
  | StrippedStruct

/**
 * @since 1.3.0
 * @category Model
 */
interface StructWithRestParam<RestKind> {
  readonly extraProps: 'restParam'
  readonly restParam: RestKind
}

/**
 * @since 1.3.0
 * @category Model
 */
interface StrictStruct {
  readonly extraProps: 'error'
}

/**
 * @since 1.3.0
 * @category Model
 */
interface StrippedStruct {
  readonly extraProps: 'strip'
}

/**
 * @since 1.3.0
 * @category Model
 */
export interface WithStructM<S extends TypeLambda> {
  readonly structM: <
    Props extends Record<
      string,
      Prop<KeyFlag, S, Kind<S, unknown, unknown>, string | KeyNotMapped>
    >,
    RestKind extends Kind<S, any, any> | undefined,
  >(
    properties: Props,
    params?: StructOptions<RestKind>,
  ) => Kind<
    S,
    Combine<
      _.RestInputHKT2<S, RestKind> & {
        [K in _.RequiredProps<Props>]: _.InputHKT2<S, Props[K]>
      } & {
        [K in _.OptionalProps<Props>]?: _.InputHKT2<S, Props>
      }
    >,
    Combine<
      _.RestOutputHKT2<S, RestKind> & {
        [K in _.RequiredProps<Props> as _.RemapKey<K, Props[K]>]: _.OutputHKT2<
          S,
          Props[K]
        >
      } & {
        [K in _.OptionalProps<Props> as _.RemapKey<K, Props[K]>]?: _.OutputHKT2<
          S,
          Props[K]
        >
      }
    >
  >
}
