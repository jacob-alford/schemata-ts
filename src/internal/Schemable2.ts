import { HKT2, Kind2, URIS2 } from 'fp-ts/HKT'
import { Literal } from 'io-ts/Schemable'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any

type AofHKT2<S, X> = [X] extends [HKT2<S, Any, infer A>] ? A : never
type EofHKT2<S, X> = [X] extends [HKT2<S, infer E, Any>] ? E : never

type AofKind2<S extends URIS2, X> = [X] extends [Kind2<S, Any, infer A>] ? A : never
type EofKind2<S extends URIS2, X> = [X] extends [Kind2<S, infer E, Any>] ? E : never

type EnsureTagHKT2<S, T extends string, M> = {
  [K in keyof M]: HKT2<S, Any, { [_ in T]: K }>
}

type EnsureTagKind2<S extends URIS2, T extends string, M> = {
  [K in keyof M]: Kind2<S, Any, { [_ in T]: K }>
}

export interface SchemableHKT2<S> {
  readonly URI: S
  readonly literal: <
    A extends readonly [L, ...ReadonlyArray<L>],
    L extends Literal = Literal
  >(
    ...values: A
  ) => HKT2<S, A[number], A[number]>
  readonly string: HKT2<S, string, string>
  readonly number: HKT2<S, number, number>
  readonly boolean: HKT2<S, boolean, boolean>
  readonly nullable: <O, A>(or: HKT2<S, O, A>) => HKT2<S, null | O, null | A>
  readonly struct: <Properties extends Record<PropertyKey, HKT2<S, Any, Any>>>(
    properties: Properties
  ) => HKT2<
    S,
    { [K in keyof Properties]: EofHKT2<S, Properties[K]> },
    { [K in keyof Properties]: AofHKT2<S, Properties[K]> }
  >
  readonly partial: <Properties extends Record<PropertyKey, HKT2<S, Any, Any>>>(
    properties: Properties
  ) => HKT2<
    S,
    Partial<{ [K in keyof Properties]: EofHKT2<S, Properties[K]> }>,
    Partial<{ [K in keyof Properties]: AofHKT2<S, Properties[K]> }>
  >
  readonly record: <O, A>(
    codomain: HKT2<S, O, A>
  ) => HKT2<S, Record<string, O>, Record<string, A>>
  readonly array: <O, A>(item: HKT2<S, O, A>) => HKT2<S, Array<O>, Array<A>>
  readonly tuple: <Components extends Array<HKT2<S, Any, Any>>>(
    ...components: Components
  ) => HKT2<
    S,
    { [K in keyof Components]: EofHKT2<S, Components[K]> },
    { [K in keyof Components]: AofHKT2<S, Components[K]> }
  >
  readonly intersect: <O2, A2>(
    right: HKT2<S, O2, A2>
  ) => <O1, A1>(left: HKT2<S, O1, A1>) => HKT2<S, O1 & O2, A1 & A2>
  readonly sum: <T extends string>(
    tag: T
  ) => <Members extends Record<PropertyKey, HKT2<S, Any, Any>>>(
    members: EnsureTagHKT2<S, T, Members> & Members
  ) => HKT2<S, EofHKT2<S, Members[keyof Members]>, AofHKT2<S, Members[keyof Members]>>
  readonly lazy: <O, A>(id: string, f: () => HKT2<S, O, A>) => HKT2<S, O, A>
  readonly readonly: <O, A>(soa: HKT2<S, O, A>) => HKT2<S, O, Readonly<A>>
}

export interface Schemable2<S extends URIS2> {
  readonly URI: S
  readonly literal: <
    A extends readonly [L, ...ReadonlyArray<L>],
    L extends Literal = Literal
  >(
    ...values: A
  ) => Kind2<S, A[number], A[number]>
  readonly string: Kind2<S, string, string>
  readonly number: Kind2<S, number, number>
  readonly boolean: Kind2<S, boolean, boolean>
  readonly nullable: <O, A>(or: Kind2<S, O, A>) => Kind2<S, null | O, null | A>
  readonly struct: <Properties extends Record<PropertyKey, Kind2<S, Any, Any>>>(
    properties: Properties
  ) => Kind2<
    S,
    { [K in keyof Properties]: EofKind2<S, Properties[K]> },
    { [K in keyof Properties]: AofKind2<S, Properties[K]> }
  >
  readonly partial: <Properties extends Record<PropertyKey, Kind2<S, Any, Any>>>(
    properties: Properties
  ) => Kind2<
    S,
    Partial<{ [K in keyof Properties]: EofKind2<S, Properties[K]> }>,
    Partial<{ [K in keyof Properties]: AofKind2<S, Properties[K]> }>
  >
  readonly record: <O, A>(
    codomain: Kind2<S, O, A>
  ) => Kind2<S, Record<string, O>, Record<string, A>>
  readonly array: <O, A>(item: Kind2<S, O, A>) => Kind2<S, Array<O>, Array<A>>
  readonly tuple: <Components extends Array<Kind2<S, Any, Any>>>(
    ...components: Components
  ) => Kind2<
    S,
    { [K in keyof Components]: EofKind2<S, Components[K]> },
    { [K in keyof Components]: AofKind2<S, Components[K]> }
  >
  readonly intersect: <O2, A2>(
    right: Kind2<S, O2, A2>
  ) => <O1, A1>(left: Kind2<S, O1, A1>) => Kind2<S, O1 & O2, A1 & A2>
  readonly sum: <T extends string>(
    tag: T
  ) => <Members extends Record<PropertyKey, Kind2<S, Any, Any>>>(
    members: EnsureTagKind2<S, T, Members> & Members
  ) => Kind2<S, EofKind2<S, Members[keyof Members]>, AofKind2<S, Members[keyof Members]>>
  readonly lazy: <O, A>(id: string, f: () => Kind2<S, O, A>) => Kind2<S, O, A>
  readonly readonly: <O, A>(soa: Kind2<S, O, A>) => Kind2<S, O, Readonly<A>>
}

export interface WithUnknownContainersHKT2<S> {
  readonly UnknownArray: HKT2<S, Array<unknown>, Array<unknown>>
  readonly UnknownRecord: HKT2<S, Record<string, unknown>, Record<string, unknown>>
}

export interface WithUnknownContainers2<S extends URIS2> {
  readonly UnknownArray: Kind2<S, Array<unknown>, Array<unknown>>
  readonly UnknownRecord: Kind2<S, Record<string, unknown>, Record<string, unknown>>
}
