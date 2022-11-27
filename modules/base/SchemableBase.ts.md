---
title: base/SchemableBase.ts
nav_order: 8
parent: Modules
---

## SchemableBase overview

A base `Schemable` built with a type arity of two to support Encoder.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [Schemable2 (interface)](#schemable2-interface)
  - [SchemableHKT2 (interface)](#schemablehkt2-interface)

---

# utils

## Schemable2 (interface)

A base `Schemable` built with a type arity of two to support Encoder.

**Signature**

```ts
export interface Schemable2<S extends URIS2> {
  readonly URI: S
  readonly literal: <A extends readonly [L, ...ReadonlyArray<L>], L extends Literal = Literal>(
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
  readonly record: <O, A>(codomain: Kind2<S, O, A>) => Kind2<S, Record<string, O>, Record<string, A>>
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
  ) => Kind2<
    S,
    { [K in keyof Members]: EofKind2<S, Members[K]> }[keyof Members],
    { [K in keyof Members]: AofKind2<S, Members[K]> }[keyof Members]
  >
  readonly lazy: <O, A>(id: string, f: () => Kind2<S, O, A>) => Kind2<S, O, A>
  readonly readonly: <O, A>(soa: Kind2<S, O, A>) => Kind2<S, O, Readonly<A>>
}
```

Added in v1.0.0

## SchemableHKT2 (interface)

A base `Schemable` built with a type arity of two to support Encoder.

**Signature**

```ts
export interface SchemableHKT2<S> {
  readonly URI: S
  readonly literal: <A extends readonly [L, ...ReadonlyArray<L>], L extends Literal = Literal>(
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
  readonly record: <O, A>(codomain: HKT2<S, O, A>) => HKT2<S, Record<string, O>, Record<string, A>>
  readonly array: <O, A>(item: HKT2<S, O, A>) => HKT2<S, Array<O>, Array<A>>
  readonly tuple: <Components extends Array<HKT2<S, Any, Any>>>(
    ...components: Components
  ) => HKT2<
    S,
    { [K in keyof Components]: EofHKT2<S, Components[K]> },
    { [K in keyof Components]: AofHKT2<S, Components[K]> }
  >
  readonly intersect: <O2, A2>(right: HKT2<S, O2, A2>) => <O1, A1>(left: HKT2<S, O1, A1>) => HKT2<S, O1 & O2, A1 & A2>
  readonly sum: <T extends string>(
    tag: T
  ) => <Members extends Record<PropertyKey, HKT2<S, Any, Any>>>(
    members: EnsureTagHKT2<S, T, Members> & Members
  ) => HKT2<
    S,
    { [K in keyof Members]: EofHKT2<S, Members[K]> }[keyof Members],
    { [K in keyof Members]: AofHKT2<S, Members[K]> }[keyof Members]
  >
  readonly lazy: <O, A>(id: string, f: () => HKT2<S, O, A>) => HKT2<S, O, A>
  readonly readonly: <O, A>(soa: HKT2<S, O, A>) => HKT2<S, O, Readonly<A>>
}
```

Added in v1.0.0
