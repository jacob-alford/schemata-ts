---
title: base/ArbitraryBase.ts
nav_order: 2
parent: Modules
---

## ArbitraryBase overview

An instance of `Schemable` for `fast-check` arbitraries that emit valid values

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Combinators](#combinators)
  - [array](#array)
  - [intersect](#intersect)
  - [lazy](#lazy)
  - [nullable](#nullable)
  - [partial](#partial)
  - [record](#record)
  - [refine](#refine)
  - [struct](#struct)
  - [sum](#sum)
  - [tuple](#tuple)
  - [union](#union)
- [Combintors](#combintors)
  - [readonly](#readonly)
- [Constructors](#constructors)
  - [literal](#literal)
- [Instances](#instances)
  - [Schemable](#schemable)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [WithRefine](#withrefine)
  - [WithUnion](#withunion)
  - [WithUnknownContainers](#withunknowncontainers)
- [Model](#model)
  - [Arbitrary (interface)](#arbitrary-interface)
- [Primitives](#primitives)
  - [UnknownArray](#unknownarray)
  - [UnknownRecord](#unknownrecord)
  - [boolean](#boolean)
  - [number](#number)
  - [string](#string)

---

# Combinators

## array

**Signature**

```ts
export declare const array: <A>(item: Arbitrary<A>) => Arbitrary<A[]>
```

Added in v1.0.0

## intersect

**Signature**

```ts
export declare const intersect: <B>(right: Arbitrary<B>) => <A>(left: Arbitrary<A>) => Arbitrary<A & B>
```

Added in v1.0.0

## lazy

**Signature**

```ts
export declare const lazy: <A>(f: () => Arbitrary<A>) => Arbitrary<A>
```

Added in v1.0.0

## nullable

**Signature**

```ts
export declare const nullable: <A>(or: Arbitrary<A>) => Arbitrary<A | null>
```

Added in v1.0.0

## partial

**Signature**

```ts
export declare const partial: <A>(properties: { [K in keyof A]: Arbitrary<A[K]> }) => Arbitrary<Partial<A>>
```

Added in v1.0.0

## record

**Signature**

```ts
export declare const record: <A>(codomain: Arbitrary<A>) => Arbitrary<Record<string, A>>
```

Added in v1.0.0

## refine

**Signature**

```ts
export declare const refine: <A, B>(refinement: Refinement<A, B>, id: string) => (from: Arbitrary<A>) => Arbitrary<B>
```

Added in v1.0.0

## struct

**Signature**

```ts
export declare const struct: <A>(properties: { [K in keyof A]: Arbitrary<A[K]> }) => Arbitrary<A>
```

Added in v1.0.0

## sum

**Signature**

```ts
export declare const sum: <T extends string>(
  _tag: T
) => <A>(members: { [K in keyof A]: Arbitrary<A[K] & Record<T, K>> }) => Arbitrary<A[keyof A]>
```

Added in v1.0.0

## tuple

**Signature**

```ts
export declare const tuple: <A extends readonly unknown[]>(
  ...components: { [K in keyof A]: Arbitrary<A[K]> }
) => Arbitrary<A>
```

Added in v1.0.0

## union

**Signature**

```ts
export declare const union: <A>(...members: { [K in keyof A]: Arbitrary<A[K]> }) => Arbitrary<A[number]>
```

Added in v1.0.0

# Combintors

## readonly

**Signature**

```ts
export declare const readonly: <A>(arb: Arbitrary<A>) => Arbitrary<Readonly<A>>
```

Added in v1.0.0

# Constructors

## literal

**Signature**

```ts
export declare const literal: <A extends readonly [L, ...L[]], L extends S.Literal = S.Literal>(
  ...values: A
) => Arbitrary<A[number]>
```

Added in v1.0.0

# Instances

## Schemable

**Signature**

```ts
export declare const Schemable: S.Schemable1<'Arbitrary'>
```

Added in v1.0.0

## URI

**Signature**

```ts
export declare const URI: 'Arbitrary'
```

Added in v1.0.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v1.0.0

## WithRefine

**Signature**

```ts
export declare const WithRefine: S.WithRefine1<'Arbitrary'>
```

Added in v1.0.0

## WithUnion

**Signature**

```ts
export declare const WithUnion: S.WithUnion1<'Arbitrary'>
```

Added in v1.0.0

## WithUnknownContainers

**Signature**

```ts
export declare const WithUnknownContainers: S.WithUnknownContainers1<'Arbitrary'>
```

Added in v1.0.0

# Model

## Arbitrary (interface)

**Signature**

```ts
export interface Arbitrary<A> {
  readonly arbitrary: (fc: typeof FastCheck) => FastCheck.Arbitrary<A>
}
```

Added in v1.0.0

# Primitives

## UnknownArray

**Signature**

```ts
export declare const UnknownArray: Arbitrary<unknown[]>
```

Added in v1.0.0

## UnknownRecord

**Signature**

```ts
export declare const UnknownRecord: Arbitrary<Record<string, unknown>>
```

Added in v1.0.0

## boolean

**Signature**

```ts
export declare const boolean: Arbitrary<boolean>
```

Added in v1.0.0

## number

**Signature**

```ts
export declare const number: Arbitrary<number>
```

Added in v1.0.0

## string

**Signature**

```ts
export declare const string: Arbitrary<string>
```

Added in v1.0.0
