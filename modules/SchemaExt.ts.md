---
title: SchemaExt.ts
nav_order: 21
parent: Modules
---

## SchemaExt overview

Schema combinators for SchemableExt

Added in v0.0.1

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [make](#make)
- [Destructors](#destructors)
  - [interpreter](#interpreter)
- [Model](#model)
  - [SchemaExt (interface)](#schemaext-interface)
- [Utilities](#utilities)
  - [TypeOf (type alias)](#typeof-type-alias)

---

# Constructors

## make

**Signature**

```ts
export declare function make<E, A>(f: SchemaExt<E, A>): SchemaExt<E, A>
```

Added in v0.0.1

# Destructors

## interpreter

Derives a typeclass instance from a Schema by supplying Schemable. i.e.
`schemable-ts-types/Decoder`

**Signature**

```ts
export declare const interpreter: {
  <
    S extends
      | 'io-ts/TaskDecoder'
      | 'io-ts/Decoder'
      | 'io-ts/Encoder'
      | 'Separated'
      | 'Either'
      | 'ReadonlyTuple'
      | 'IOEither'
      | 'TaskEither'
  >(
    S: SchemableExt2<S>
  ): <E, A>(schema: SchemaExt<E, A>) => Kind2<S, E, A>
  <
    S extends
      | 'io-ts/TaskDecoder'
      | 'io-ts/Decoder'
      | 'io-ts/Encoder'
      | 'Separated'
      | 'Either'
      | 'ReadonlyTuple'
      | 'IOEither'
      | 'TaskEither'
  >(
    S: SchemableExt2C<S>
  ): <A>(schema: SchemaExt<unknown, A>) => Kind2<S, unknown, A>
  <
    S extends
      | 'io-ts/Type'
      | 'Eq'
      | 'io-ts/Guard'
      | 'Arbitrary'
      | 'Predicate'
      | 'ReadonlyNonEmptyArray'
      | 'Option'
      | 'ReadonlyRecord'
      | 'Endomorphism'
      | 'Ord'
      | 'ReadonlyArray'
      | 'IO'
      | 'Task'
      | 'TaskOption'
  >(
    S: SchemableExt1<S>
  ): <A>(schema: SchemaExt<unknown, A>) => Kind<S, A>
}
```

Added in v0.0.1

# Model

## SchemaExt (interface)

**Signature**

```ts
export interface SchemaExt<E, A> {
  <S>(S: SchemableExt<S>): HKT2<S, E, A>
}
```

Added in v0.0.1

# Utilities

## TypeOf (type alias)

**Signature**

```ts
export type TypeOf<S> = S extends SchemaExt<unknown, infer A> ? A : never
```

Added in v2.2.0
