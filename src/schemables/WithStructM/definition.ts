/**
 * Schemable construction based on Regex combinators
 *
 * @since 1.3.0
 */
import { HKT2, Kind, Kind2, URIS, URIS2 } from 'fp-ts/HKT'
import * as Enc from 'schemata-ts/base/EncoderBase'

/**
 * @since 1.3.0
 * @category Model
 */
export type KeyFlag = 'required' | 'optional'

type Prop<S> = readonly [val: HKT2<S, any, any>]
type PropWithKeyFlag<S> = readonly [flag: KeyFlag, val: HKT2<S, any, any>]
type PropWithMappedKeyFlag<S, K extends string> = readonly [
  flag: KeyFlag,
  keyOut: K,
  val: HKT2<S, any, any>,
]

/**
 * @since 1.3.0
 * @category Model
 */
export interface WithStructM<S> {
  readonly structM: <
    Props extends Record<
      string,
      | (() => Prop<S>)
      | (() => PropWithKeyFlag<S>)
      | (<K extends string>() => PropWithMappedKeyFlag<S, K>)
    >,
  >(
    properties: Props,
  ) => HKT2<
    S,
    {
      [K in keyof Props as Props[K] extends readonly [infer Flag, any, any]
        ? Flag extends 'required'
          ? K
          : never
        : Props[K] extends readonly [infer Flag, any]
        ? Flag extends 'required'
          ? K
          : never
        : never]: Props[K] extends readonly [any, any, infer Val]
        ? Val extends HKT2<S, infer E, any>
          ? E
          : never
        : Props[K] extends readonly [any, infer Val]
        ? Val extends HKT2<S, infer E, any>
          ? E
          : never
        : never
    } & {
      [K in keyof Props as Props[K] extends readonly [infer Flag, any, any]
        ? Flag extends 'optional'
          ? K
          : never
        : Props[K] extends readonly [infer Flag, any]
        ? Flag extends 'optional'
          ? K
          : never
        : never]: Props[K] extends readonly [any, any, infer Val]
        ? Val extends HKT2<S, infer E, any>
          ? E
          : never
        : Props[K] extends readonly [any, infer Val]
        ? Val extends HKT2<S, infer E, any>
          ? E
          : never
        : never
    },
    {
      [K in keyof Props as Props[K] extends readonly [infer Flag, infer KOut, any]
        ? Flag extends 'required'
          ? KOut
          : never
        : Props[K] extends readonly [infer Flag, any]
        ? Flag extends 'required'
          ? K
          : never
        : K]: Props[K] extends readonly [any, any, infer Val]
        ? Val extends HKT2<S, any, infer A>
          ? A
          : never
        : Props[K] extends readonly [any, infer Val]
        ? Val extends HKT2<S, any, infer A>
          ? A
          : never
        : never
    } & {
      [K in keyof Props as Props[K] extends readonly [infer Flag, infer KOut, any]
        ? Flag extends 'optional'
          ? KOut
          : never
        : Props[K] extends readonly [infer Flag, any]
        ? Flag extends 'optional'
          ? K
          : never
        : K]: Props[K] extends readonly [any, any, infer Val]
        ? Val extends HKT2<S, any, infer A>
          ? A
          : never
        : Props[K] extends readonly [any, infer Val]
        ? Val extends HKT2<S, any, infer A>
          ? A
          : never
        : never
    }
  >
}

type PropWithKeyFlag2<S extends URIS2> = readonly [flag: KeyFlag, val: Kind2<S, any, any>]
type PropWithMappedKeyFlag2<S extends URIS2, K extends string> = readonly [
  flag: KeyFlag,
  keyOut: K,
  val: Kind2<S, any, any>,
]

/**
 * @since 1.3.0
 * @category Model
 */
export interface WithStructM2<S extends URIS2> {
  readonly structM: <
    Props extends Record<string, PropWithKeyFlag2<S> | PropWithMappedKeyFlag2<S, string>>,
  >(
    properties: Props,
  ) => Kind2<
    S,
    {
      [K in keyof Props as Props[K] extends readonly [infer Flag, any, any]
        ? Flag extends 'required'
          ? K
          : never
        : Props[K] extends readonly [infer Flag, any]
        ? Flag extends 'required'
          ? K
          : never
        : never]: Props[K] extends readonly [any, any, infer Val]
        ? Val extends Kind2<S, infer E, any>
          ? E
          : never
        : Props[K] extends readonly [any, infer Val]
        ? Val extends Kind2<S, infer E, any>
          ? E
          : never
        : never
    } & {
      [K in keyof Props as Props[K] extends readonly [infer Flag, any, any]
        ? Flag extends 'optional'
          ? K
          : never
        : Props[K] extends readonly [infer Flag, any]
        ? Flag extends 'optional'
          ? K
          : never
        : never]+?: Props[K] extends readonly [any, any, infer Val]
        ? Val extends Kind2<S, infer E, any>
          ? E
          : never
        : Props[K] extends readonly [any, infer Val]
        ? Val extends Kind2<S, infer E, any>
          ? E
          : never
        : never
    },
    {
      [K in keyof Props as Props[K] extends readonly [infer Flag, infer KOut, any]
        ? Flag extends 'required'
          ? KOut
          : never
        : Props[K] extends readonly [infer Flag, any]
        ? Flag extends 'required'
          ? K
          : never
        : never]: Props[K] extends readonly [any, any, infer Val]
        ? Val extends Kind2<S, any, infer A>
          ? A
          : never
        : Props[K] extends readonly [any, infer Val]
        ? Val extends Kind2<S, any, infer A>
          ? A
          : never
        : never
    } & {
      [K in keyof Props as Props[K] extends readonly [infer Flag, infer KOut, any]
        ? Flag extends 'optional'
          ? KOut
          : never
        : Props[K] extends readonly [infer Flag, any]
        ? Flag extends 'optional'
          ? K
          : never
        : never]+?: Props[K] extends readonly [any, any, infer Val]
        ? Val extends Kind2<S, any, infer A>
          ? A
          : never
        : Props[K] extends readonly [any, infer Val]
        ? Val extends Kind2<S, any, infer A>
          ? A
          : never
        : never
    }
  >
}

declare const encodeStructM: WithStructM2<Enc.URI>['structM']

const keyWithFlag: <A, B>(a: A, b: B) => readonly [A, B] = (a, b) => [a, b]
const keyWithMappedFlag: <A extends KeyFlag, B extends string, C>(
  a: A,
  b: B,
  c: C,
) => readonly [A, B, C] = (a, b, c) => [a, b, c]

const test = encodeStructM({
  a: keyWithFlag('optional', Enc.Schemable.string),
  b: keyWithMappedFlag('required', 'c', Enc.Schemable.number),
})

const out = test.encode({ c: 5 })
