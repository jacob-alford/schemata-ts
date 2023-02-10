/**
 * Schemable for mapping a struct
 *
 * @since 1.3.0
 */
import { HKT2, Kind, Kind2, URIS, URIS2 } from 'fp-ts/HKT'
import { Combine } from 'schemata-ts/internal/type-utils'
import * as _ from 'schemata-ts/schemables/WithStructM/type-utils'
import { KeyFlag, KeyNotMapped, Prop, Prop1, Prop2 } from 'schemata-ts/struct'

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
export interface WithStructMHKT2<S> {
  readonly structM: <
    Props extends Record<
      string,
      Prop<KeyFlag, S, HKT2<S, unknown, unknown>, string | KeyNotMapped>
    >,
    RestKind extends HKT2<S, any, any> | undefined,
  >(
    properties: Props,
    params?: StructOptions<RestKind>,
  ) => HKT2<
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

/**
 * @since 1.3.0
 * @category Model
 */
export interface WithStructM1<S extends URIS> {
  readonly structM: <
    Props extends Record<string, Prop1<KeyFlag, S, Kind<S, any>, string | KeyNotMapped>>,
    RestKind extends Kind<S, any> | undefined,
  >(
    properties: Props,
    params?: StructOptions<RestKind>,
  ) => Kind<
    S,
    Combine<
      _.RestValue1<S, RestKind> & {
        [K in _.RequiredProps<Props> as _.RemapKey<K, Props[K]>]: _.InnerValue1<
          S,
          Props[K]
        >
      } & {
        [K in _.OptionalProps<Props> as _.RemapKey<K, Props[K]>]?: _.InnerValue1<
          S,
          Props[K]
        >
      }
    >
  >
}

/**
 * @since 1.3.0
 * @category Model
 */
export interface WithStructM2<S extends URIS2> {
  readonly structM: <
    Props extends Record<
      string,
      Prop2<KeyFlag, S, Kind2<S, any, any>, string | KeyNotMapped>
    >,
    RestKind extends Kind2<S, any, any> | undefined,
  >(
    properties: Props,
    params?: StructOptions<RestKind>,
  ) => Kind2<
    S,
    Combine<
      _.RestInput2<S, RestKind> & {
        [K in _.RequiredProps<Props>]: _.Input2<S, Props[K]>
      } & {
        [K in _.OptionalProps<Props>]?: _.Input2<S, Props[K]>
      }
    >,
    Combine<
      _.RestOutput2<S, RestKind> & {
        [K in _.RequiredProps<Props> as _.RemapKey<K, Props[K]>]: _.Output2<S, Props[K]>
      } & {
        [K in _.OptionalProps<Props> as _.RemapKey<K, Props[K]>]?: _.Output2<S, Props[K]>
      }
    >
  >
}

/**
 * @since 1.3.0
 * @category Model
 */
export interface WithStructM2C<S extends URIS2, E> {
  readonly structM: <
    Props extends Record<
      string,
      Prop2<KeyFlag, S, Kind2<S, E, unknown>, string | KeyNotMapped>
    >,
    RestKind extends Kind2<S, any, any> | undefined,
  >(
    properties: Props,
    params?: StructOptions<RestKind>,
  ) => Kind2<
    S,
    E,
    Combine<
      _.RestOutput2<S, RestKind> & {
        [K in _.RequiredProps<Props> as _.RemapKey<K, Props[K]>]: _.Output2<S, Props[K]>
      } & {
        [K in _.OptionalProps<Props> as _.RemapKey<K, Props[K]>]?: _.Output2<S, Props[K]>
      }
    >
  >
}
