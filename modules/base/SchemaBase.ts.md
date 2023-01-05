---
title: base/SchemaBase.ts
nav_order: 9
parent: Modules
---

## SchemaBase overview

An instance of `Schemable` for Schema. This can be thought of as an identity schema.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Combinators](#combinators)
  - [Array](#array)
  - [Intersection](#intersection)
  - [Lazy](#lazy)
  - [Nullable](#nullable)
  - [Partial](#partial)
  - [Readonly](#readonly)
  - [Record](#record)
  - [Struct](#struct)
  - [Sum](#sum)
  - [Tuple](#tuple)
- [Constructors](#constructors)
  - [Literal](#literal)
- [Instances](#instances)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
- [Primitives](#primitives)
  - [Boolean](#boolean)
  - [Number](#number)
  - [String](#string)
- [Utilities](#utilities)
  - [OutputOf (type alias)](#outputof-type-alias)
  - [TypeOf (type alias)](#typeof-type-alias)

---

# Combinators

## Array

**Signature**

```ts
export declare const Array: <O, A>(item: SC.SchemaExt<O, A>) => SC.SchemaExt<O[], A[]>
```

Added in v1.0.0

## Intersection

**Signature**

```ts
export declare const Intersection: <O2, A2>(
  right: SC.SchemaExt<O2, A2>
) => <O1, A1>(left: SC.SchemaExt<O1, A1>) => SC.SchemaExt<O1 & O2, A1 & A2>
```

Added in v1.0.0

## Lazy

**Signature**

```ts
export declare const Lazy: <O, A>(id: string, f: () => SC.SchemaExt<O, A>) => SC.SchemaExt<O, A>
```

Added in v1.0.0

## Nullable

**Signature**

```ts
export declare const Nullable: <O, A>(or: SC.SchemaExt<O, A>) => SC.SchemaExt<O | null, A | null>
```

Added in v1.0.0

## Partial

**Signature**

```ts
export declare const Partial: <Properties>(
  properties: Properties
) => SC.SchemaExt<
  Partial<{ [K in keyof Properties]: [Properties[K]] extends [SC.SchemaExt<infer E, any>] ? E : never }>,
  Partial<{ [K in keyof Properties]: [Properties[K]] extends [SC.SchemaExt<any, infer A>] ? A : never }>
>
```

Added in v1.0.0

## Readonly

**Signature**

```ts
export declare const Readonly: <O, A>(soa: SC.SchemaExt<O, A>) => SC.SchemaExt<O, Readonly<A>>
```

Added in v1.0.0

## Record

**Signature**

```ts
export declare const Record: <O, A>(codomain: SC.SchemaExt<O, A>) => SC.SchemaExt<Record<string, O>, Record<string, A>>
```

Added in v1.0.0

## Struct

**Signature**

```ts
export declare const Struct: <Properties>(
  properties: Properties
) => SC.SchemaExt<
  { [K in keyof Properties]: [Properties[K]] extends [SC.SchemaExt<infer E, any>] ? E : never },
  { [K in keyof Properties]: [Properties[K]] extends [SC.SchemaExt<any, infer A>] ? A : never }
>
```

Added in v1.0.0

## Sum

**Signature**

```ts
export declare const Sum: <T extends string>(
  tag: T
) => <MS extends Record<string, SC.SchemaExt<any, any>>>(
  members: MS
) => SC.SchemaExt<OutputOf<MS[keyof MS]>, TypeOf<MS[keyof MS]>>
```

Added in v1.0.0

## Tuple

**Signature**

```ts
export declare const Tuple: <Components>(
  ...components: Components
) => SC.SchemaExt<
  { [K in keyof Components]: [Components[K]] extends [SC.SchemaExt<infer E, any>] ? E : never },
  { [K in keyof Components]: [Components[K]] extends [SC.SchemaExt<any, infer A>] ? A : never }
>
```

Added in v1.0.0

# Constructors

## Literal

**Signature**

```ts
export declare const Literal: <A, L>(...values: A) => SC.SchemaExt<A[number], A[number]>
```

Added in v1.0.0

# Instances

## URI

**Signature**

```ts
export declare const URI: 'SchemaExt'
```

Added in v1.0.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v1.0.0

# Primitives

## Boolean

**Signature**

```ts
export declare const Boolean: SC.SchemaExt<boolean, boolean>
```

Added in v1.0.0

## Number

**Signature**

```ts
export declare const Number: SC.SchemaExt<number, number>
```

Added in v1.0.0

## String

**Signature**

```ts
export declare const String: SC.SchemaExt<string, string>
```

Added in v1.0.0

# Utilities

## OutputOf (type alias)

**Signature**

```ts
export type OutputOf<S> = S extends SC.SchemaExt<infer O, Any> ? O : never
```

Added in v1.0.0

## TypeOf (type alias)

**Signature**

```ts
export type TypeOf<S> = S extends SC.SchemaExt<Any, infer A> ? A : never
```

Added in v1.0.0
