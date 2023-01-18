/**
 * Schemable for mapping a struct
 *
 * @since 1.3.0
 */
import { HKT2, Kind, Kind2, URIS, URIS2 } from 'fp-ts/HKT'

const OptionalKeyFlag = Symbol()
type OptionalKeyFlag = typeof OptionalKeyFlag

const RequiredKeyFlag = Symbol()
type RequiredKeyFlag = typeof RequiredKeyFlag

const KeyNotMapped = Symbol()
type KeyNotMapped = typeof KeyNotMapped

/**
 * @since 1.3.0
 * @category Model
 */
export type KeyFlag = OptionalKeyFlag | RequiredKeyFlag

/**
 * @since 1.3.0
 * @category Model
 */
export type Prop<
  Flag extends KeyFlag,
  S,
  Val extends HKT2<S, any, any>,
  K extends string | KeyNotMapped,
> = readonly [Flag, K, Val]

/**
 * @since 1.3.0
 * @category Model
 */
export type Prop1<
  Flag extends KeyFlag,
  S extends URIS,
  Val extends Kind<S, any>,
  K extends string | KeyNotMapped,
> = readonly [Flag, K, Val]

/**
 * @since 1.3.0
 * @category Model
 */
export type Prop2<
  Flag extends KeyFlag,
  S extends URIS2,
  Val extends Kind2<S, any, any>,
  K extends string | KeyNotMapped,
> = readonly [Flag, K, Val]

type Required = {
  <S extends URIS2, Val extends Kind2<S, any, any>>(val: Val): Prop2<
    RequiredKeyFlag,
    S,
    Val,
    KeyNotMapped
  >
  <S extends URIS, Val extends Kind<S, any>>(val: Val): Prop1<
    RequiredKeyFlag,
    S,
    Val,
    KeyNotMapped
  >
  <S, Val extends HKT2<S, any, any>>(val: Val): Prop<
    RequiredKeyFlag,
    S,
    Val,
    KeyNotMapped
  >
}

/**
 * @since 1.3.0
 * @category Constructors
 */
export const required: Required = (val: any) =>
  [RequiredKeyFlag, KeyNotMapped, val] as any

/**
 * @since 1.3.0
 * @category Constructors
 */
export const isRequiredFlag = (flag: KeyFlag): flag is RequiredKeyFlag =>
  flag === RequiredKeyFlag

type Optional = {
  <S extends URIS2, Val extends Kind2<S, any, any>>(val: Val): Prop2<
    OptionalKeyFlag,
    S,
    Val,
    KeyNotMapped
  >
  <S extends URIS, Val extends Kind<S, any>>(val: Val): Prop1<
    OptionalKeyFlag,
    S,
    Val,
    KeyNotMapped
  >
  <S, Val extends HKT2<S, any, any>>(val: Val): Prop<
    OptionalKeyFlag,
    S,
    Val,
    KeyNotMapped
  >
}

/**
 * @since 1.3.0
 * @category Constructors
 */
export const optional: Optional = (val: any) =>
  [OptionalKeyFlag, KeyNotMapped, val] as any

type MapKeyTo = {
  <K extends string>(mapTo: K): <
    Flag extends KeyFlag,
    S extends URIS2,
    Val extends Kind2<S, any, any>,
  >(
    prop: Prop2<Flag, S, Val, KeyNotMapped>,
  ) => Prop<Flag, S, Val, K>
  <K extends string>(mapTo: K): <
    Flag extends KeyFlag,
    S extends URIS,
    Val extends Kind<S, any>,
  >(
    prop: Prop1<Flag, S, Val, KeyNotMapped>,
  ) => Prop1<Flag, S, Val, K>
  <K extends string>(mapTo: K): <Flag extends KeyFlag, S, Val extends HKT2<S, any, any>>(
    prop: Prop<Flag, S, Val, KeyNotMapped>,
  ) => Prop<Flag, S, Val, K>
}

/**
 * @since 1.3.0
 * @category Constructors
 */
export const isOptionalFlag = (flag: KeyFlag): flag is OptionalKeyFlag =>
  flag === OptionalKeyFlag

/**
 * @since 1.3.0
 * @category Combinators
 */
export const mapKeyTo: MapKeyTo = mapTo => (prop: any) => [prop[0], mapTo, prop[2]] as any

/**
 * @since 1.3.0
 * @category Combinators
 */
export const keyIsNotMapped = (key: string | KeyNotMapped): key is KeyNotMapped =>
  key === KeyNotMapped

type Combine<A> = {
  [K in keyof A]: A[K]
} extends infer B
  ? B
  : never

/**
 * @since 1.3.0
 * @category Model
 */
export interface WithStructM<S> {
  readonly structM: <
    Props extends Record<
      string,
      Prop<KeyFlag, S, HKT2<S, unknown, unknown>, string | KeyNotMapped>
    >,
  >(
    properties: Props,
  ) => HKT2<
    S,
    Combine<
      {
        [K in keyof Props as Props[K] extends readonly [infer Flag, any, any]
          ? Flag extends RequiredKeyFlag
            ? K
            : never
          : never]: Props[K] extends readonly [any, any, infer Val]
          ? Val extends HKT2<S, infer E, any>
            ? E
            : never
          : never
      } & {
        [K in keyof Props as Props[K] extends readonly [infer Flag, any, any]
          ? Flag extends OptionalKeyFlag
            ? K
            : never
          : never]?: Props[K] extends readonly [any, any, infer Val]
          ? Val extends HKT2<S, infer E, any>
            ? E
            : never
          : never
      }
    >,
    Combine<
      {
        [K in keyof Props as Props[K] extends readonly [infer Flag, infer KOut, any]
          ? Flag extends RequiredKeyFlag
            ? KOut extends KeyNotMapped
              ? K
              : KOut extends keyof Props
              ? K
              : KOut
            : never
          : never]: Props[K] extends readonly [any, any, infer Val]
          ? Val extends HKT2<S, any, infer A>
            ? A
            : never
          : never
      } & {
        [K in keyof Props as Props[K] extends readonly [infer Flag, infer KOut, any]
          ? Flag extends OptionalKeyFlag
            ? KOut extends KeyNotMapped
              ? K
              : KOut extends keyof Props
              ? K
              : KOut
            : never
          : never]: Props[K] extends readonly [any, any, infer Val]
          ? Val extends HKT2<S, any, infer A>
            ? A
            : never
          : never
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
    Props extends Record<
      string,
      Prop1<KeyFlag, S, Kind<S, unknown>, string | KeyNotMapped>
    >,
  >(
    properties: Props,
  ) => Kind<
    S,
    Combine<
      {
        [K in keyof Props as Props[K] extends readonly [infer Flag, infer KOut, any]
          ? Flag extends RequiredKeyFlag
            ? KOut extends KeyNotMapped
              ? K
              : KOut extends keyof Props
              ? K
              : KOut
            : never
          : never]: Props[K] extends readonly [any, any, infer Val]
          ? Val extends Kind<S, infer A>
            ? A
            : never
          : never
      } & {
        [K in keyof Props as Props[K] extends readonly [infer Flag, infer KOut, any]
          ? Flag extends OptionalKeyFlag
            ? KOut extends KeyNotMapped
              ? K
              : KOut extends keyof Props
              ? K
              : KOut
            : never
          : never]?: Props[K] extends readonly [any, any, infer Val]
          ? Val extends Kind<S, infer A>
            ? A
            : never
          : never
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
      Prop2<KeyFlag, S, Kind2<S, unknown, unknown>, string | KeyNotMapped>
    >,
  >(
    properties: Props,
  ) => Kind2<
    S,
    Combine<
      {
        [K in keyof Props as Props[K] extends readonly [infer Flag, any, any]
          ? Flag extends RequiredKeyFlag
            ? K
            : never
          : never]: Props[K] extends readonly [any, any, infer Val]
          ? Val extends Kind2<S, infer E, any>
            ? E
            : never
          : never
      } & {
        [K in keyof Props as Props[K] extends readonly [infer Flag, any, any]
          ? Flag extends OptionalKeyFlag
            ? K
            : never
          : never]?: Props[K] extends readonly [any, any, infer Val]
          ? Val extends Kind2<S, infer E, any>
            ? E
            : never
          : never
      }
    >,
    Combine<
      {
        [K in keyof Props as Props[K] extends readonly [infer Flag, infer KOut, any]
          ? Flag extends RequiredKeyFlag
            ? KOut extends KeyNotMapped
              ? K
              : KOut extends keyof Props
              ? K
              : KOut
            : never
          : never]: Props[K] extends readonly [any, any, infer Val]
          ? Val extends Kind2<S, any, infer A>
            ? A
            : never
          : never
      } & {
        [K in keyof Props as Props[K] extends readonly [infer Flag, infer KOut, any]
          ? Flag extends OptionalKeyFlag
            ? KOut extends KeyNotMapped
              ? K
              : KOut extends keyof Props
              ? K
              : KOut
            : never
          : never]?: Props[K] extends readonly [any, any, infer Val]
          ? Val extends Kind2<S, any, infer A>
            ? A
            : never
          : never
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
  >(
    properties: Props,
  ) => Kind2<
    S,
    E,
    Combine<
      {
        [K in keyof Props as Props[K] extends readonly [infer Flag, infer KOut, any]
          ? Flag extends RequiredKeyFlag
            ? KOut extends KeyNotMapped
              ? K
              : KOut extends keyof Props
              ? K
              : KOut
            : never
          : never]: Props[K] extends readonly [any, any, infer Val]
          ? Val extends Kind2<S, any, infer A>
            ? A
            : never
          : never
      } & {
        [K in keyof Props as Props[K] extends readonly [infer Flag, infer KOut, any]
          ? Flag extends OptionalKeyFlag
            ? KOut extends KeyNotMapped
              ? K
              : KOut extends keyof Props
              ? K
              : KOut
            : never
          : never]?: Props[K] extends readonly [any, any, infer Val]
          ? Val extends Kind2<S, any, infer A>
            ? A
            : never
          : never
      }
    >
  >
}
