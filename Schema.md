---
title: Schema.ts
nav_order: 10
permalink: /schema/
---

## Schema overview

The schemata-ts schema type

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Guards](#guards)
  - [isSchema](#isschema)
- [Implementation](#implementation)
  - [SchemaImplementation (class)](#schemaimplementation-class)
    - [[SchemaSymbol] (property)](#schemasymbol-property)
    - [input (property)](#input-property)
    - [output (property)](#output-property)
    - [runSchema (property)](#runschema-property)
- [Model](#model)
  - [Schema (interface)](#schema-interface)
- [Type Helpers](#type-helpers)
  - [InputOf (type alias)](#inputof-type-alias)
  - [OutputOf (type alias)](#outputof-type-alias)
  - [TypeOf (type alias)](#typeof-type-alias)
- [Utilities](#utilities)
  - [memoize](#memoize)

---

# Guards

## isSchema

**Signature**

```ts
export declare const isSchema: (u: unknown) => u is Schema<unknown, unknown>
```

Added in v2.0.0

# Implementation

## SchemaImplementation (class)

**Signature**

```ts
export declare class SchemaImplementation<I, O> {
  protected constructor(runSchema: <S extends hkt.SchemableLambda>(S: Schemable<S>) => hkt.SchemableKind<S, I, O>)
}
```

Added in v2.1.0

### [SchemaSymbol] (property)

**Signature**

```ts
readonly [SchemaSymbol]: typeof SchemaSymbol
```

Added in v2.0.0

### input (property)

**Signature**

```ts
readonly input: (_: I) => I
```

Added in v2.0.0

### output (property)

**Signature**

```ts
readonly output: (_: O) => O
```

Added in v2.0.0

### runSchema (property)

**Signature**

```ts
readonly runSchema: <S extends hkt.SchemableLambda>(S: Schemable<S>) => hkt.SchemableKind<S, I, O>
```

Added in v2.0.0

# Model

## Schema (interface)

**Signature**

```ts
export interface Schema<I, O = I> {
  readonly [SchemaSymbol]: SchemaSymbol
  readonly input: (_: I) => I
  readonly output: (_: O) => O
  readonly runSchema: <S extends hkt.SchemableLambda>(S: Schemable<S>) => hkt.SchemableKind<S, I, O>
}
```

Added in v1.0.0

# Type Helpers

## InputOf (type alias)

Extract the input type of a schema.

**Signature**

```ts
export type InputOf<S> = S extends Schema<infer I, any> ? I : never
```

Added in v1.0.0

## OutputOf (type alias)

Extract the output of a schema.

Alias of `TypeOf`

**Signature**

```ts
export type OutputOf<S> = TypeOf<S>
```

Added in v1.0.0

## TypeOf (type alias)

Extract the output of a schema

**Signature**

```ts
export type TypeOf<S> = S extends Schema<any, infer A> ? A : never
```

Added in v1.0.0

# Utilities

## memoize

**Signature**

```ts
export declare const memoize: <A, B>(f: (a: A) => B) => (a: A) => B
```

Added in v1.0.0
