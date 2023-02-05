---
title: base/PrinterBase.ts
nav_order: 8
parent: Modules
---

## PrinterBase overview

An instance of `Schemable` for `Printer`.

Added in v1.1.0

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
- [Combintors](#combintors)
  - [readonly](#readonly)
- [Constructors](#constructors)
  - [literal](#literal)
- [Destructors](#destructors)
  - [safeParse](#safeparse)
  - [safeStringify](#safestringify)
- [Instances](#instances)
  - [Schemable](#schemable)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
- [Model](#model)
  - [JsonArray (interface)](#jsonarray-interface)
  - [JsonString (type alias)](#jsonstring-type-alias)
  - [Printer (interface)](#printer-interface)
  - [SafeJson (type alias)](#safejson-type-alias)
  - [SafeJsonArray (type alias)](#safejsonarray-type-alias)
  - [SafeJsonRecord (type alias)](#safejsonrecord-type-alias)
  - [SafeNumber (type alias)](#safenumber-type-alias)
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
export declare const array: <E, A>(item: Printer<E, A>) => Printer<readonly E[], readonly A[]>
```

Added in v1.1.0

## intersect

**Signature**

```ts
export declare const intersect: <F, B>(pb: Printer<F, B>) => <E, A>(pa: Printer<E, A>) => Printer<E & F, A & B>
```

Added in v1.1.0

## lazy

**Signature**

```ts
export declare const lazy: <E, A>(id: string, f: () => Printer<E, A>) => Printer<E, A>
```

Added in v1.1.0

## nullable

**Signature**

```ts
export declare const nullable: <E, A>(or: Printer<E, A>) => Printer<E | null, A | null>
```

Added in v1.1.0

## partial

**Signature**

```ts
export declare const partial: <P extends Record<string, Printer<any, any>>>(
  properties: P
) => Printer<Partial<{ [K in keyof P]: InnerLeft<P[K]> }>, Partial<{ [K in keyof P]: InnerRight<P[K]> }>>
```

Added in v1.1.0

## record

**Signature**

```ts
export declare const record: <E, A>(codomain: Printer<E, A>) => Printer<Record<string, E>, Record<string, A>>
```

Added in v1.1.0

## refine

**Signature**

```ts
export declare const refine: <A, B>(
  refinement: Refinement<A, B>,
  id: string
) => <O>(from: Printer<O, A>) => Printer<O, B>
```

Added in v1.1.0

## struct

**Signature**

```ts
export declare const struct: <P extends Record<string, Printer<any, any>>>(
  properties: P
) => Printer<{ [K in keyof P]: InnerLeft<P[K]> }, { [K in keyof P]: InnerRight<P[K]> }>
```

Added in v1.1.0

## sum

**Signature**

```ts
export declare const sum: <T extends string>(
  tag: T
) => <MS extends Record<string, Printer<any, any>>>(
  members: MS
) => Printer<{ [K in keyof MS]: InnerLeft<MS[K]> }[keyof MS], { [K in keyof MS]: InnerRight<MS[K]> }[keyof MS]>
```

Added in v1.1.0

## tuple

**Signature**

```ts
export declare const tuple: <C extends readonly Printer<any, any>[]>(
  ...components: C
) => Printer<{ [K in keyof C]: InnerLeft<C[K]> }, { [K in keyof C]: InnerRight<C[K]> }>
```

Added in v1.1.0

# Combintors

## readonly

**Signature**

```ts
export declare const readonly: <E, A>(arb: Printer<E, A>) => Printer<E, Readonly<A>>
```

Added in v1.1.0

# Constructors

## literal

**Signature**

```ts
export declare const literal: <A extends readonly [L, ...L[]], L extends S.Literal = S.Literal>(
  ..._args: A
) => Printer<A[number], A[number]>
```

Added in v1.1.0

# Destructors

## safeParse

Safely parses a Json String

**Signature**

```ts
export declare const safeParse: (s: JsonString) => SafeJson
```

Added in v1.1.0

## safeStringify

Safely stringifies a safe Json

**Signature**

```ts
export declare const safeStringify: (s: SafeJson) => JsonString
```

Added in v1.1.0

# Instances

## Schemable

**Signature**

```ts
export declare const Schemable: Schemable2<'Printer'>
```

Added in v1.1.0

## URI

**Signature**

```ts
export declare const URI: 'Printer'
```

Added in v1.1.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v1.1.0

# Model

## JsonArray (interface)

An array with validated keys

**Signature**

```ts
export interface JsonArray extends ReadonlyArray<SafeJson> {}
```

Added in v1.1.0

## JsonString (type alias)

A parsable Json string

**Signature**

```ts
export type JsonString = Branded<string, JsonStringBrand>
```

Added in v1.1.0

## Printer (interface)

**Signature**

```ts
export interface Printer<E, A> {
  readonly domainToJson: (a: A) => E.Either<PE.PrintError, SafeJson>
  readonly codomainToJson: (e: E) => E.Either<PE.PrintError, SafeJson>
}
```

Added in v1.1.0

## SafeJson (type alias)

A valid Json object

**Signature**

```ts
export type SafeJson = undefined | boolean | SafeNumber | string | null | SafeJsonArray | SafeJsonRecord
```

Added in v1.1.0

## SafeJsonArray (type alias)

A validated JSON Array

**Signature**

```ts
export type SafeJsonArray = Branded<SafeArrayBrand, JsonArray>
```

Added in v1.1.0

## SafeJsonRecord (type alias)

A validated JSON Record

**Signature**

```ts
export type SafeJsonRecord = Branded<SafeRecordBrand, JsonRecord>
```

Added in v1.1.0

## SafeNumber (type alias)

A valid Json number

**Signature**

```ts
export type SafeNumber = Branded<number, SafeNumberBrand>
```

Added in v1.1.0

# Primitives

## UnknownArray

**Signature**

```ts
export declare const UnknownArray: Printer<unknown[], unknown[]>
```

Added in v1.1.0

## UnknownRecord

**Signature**

```ts
export declare const UnknownRecord: Printer<Record<string, unknown>, Record<string, unknown>>
```

Added in v1.1.0

## boolean

**Signature**

```ts
export declare const boolean: Printer<boolean, boolean>
```

Added in v1.1.0

## number

**Signature**

```ts
export declare const number: Printer<number, number>
```

Added in v1.1.0

## string

**Signature**

```ts
export declare const string: Printer<string, string>
```

Added in v1.1.0
