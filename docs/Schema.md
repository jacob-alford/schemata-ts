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

- [Destructors](#destructors)
  - [interpret](#interpret)
- [Guards](#guards)
  - [isSchema](#isschema)
- [Model](#model)
  - [Schema (interface)](#schema-interface)
- [Utilities](#utilities)
  - [InputOf (type alias)](#inputof-type-alias)
  - [OutputOf (type alias)](#outputof-type-alias)
  - [TypeOf (type alias)](#typeof-type-alias)

---

# Destructors

## interpret

Derives a typeclass instance from a Schema by supplying Schemable

**Signature**

```ts
export declare const interpret: <S extends hkt.SchemableLambda>(
  S: Schemable<S>
) => <E, A>(schema: Schema<E, A>) => hkt.SchemableKind<S, E, A>
```

Added in v1.0.0

# Guards

## isSchema

**Signature**

```ts
export declare const isSchema: (u: unknown) => u is Schema<unknown, unknown>
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

# Utilities

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
