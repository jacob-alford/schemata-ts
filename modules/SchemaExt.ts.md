---
title: SchemaExt.ts
nav_order: 11
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

---

# Constructors

## make

**Signature**

```ts
export declare function make<A>(f: SchemaExt<A>): SchemaExt<A>
```

Added in v0.0.1

# Destructors

## interpreter

Generator a typeclass instance to a Schema by supplying Schemable. i.e.
`schemable-ts-types/Decoder`

**Signature**

```ts
export declare const interpreter: {
  <S extends 'io-ts/TaskDecoder' | 'io-ts/Decoder' | 'Separated' | 'Either' | 'IOEither' | 'TaskEither'>(
    S: SchemableExt2C<S>
  ): <A>(schema: SchemaExt<A>) => Kind2<S, unknown, A>
  <
    S extends
      | 'io-ts/Type'
      | 'Eq'
      | 'io-ts/Guard'
      | 'Predicate'
      | 'ReadonlyNonEmptyArray'
      | 'Option'
      | 'ReadonlyRecord'
      | 'Endomorphism'
      | 'Ord'
      | 'IO'
      | 'Task'
      | 'TaskOption'
  >(
    S: SchemableExt1<S>
  ): <A>(schema: SchemaExt<A>) => Kind<S, A>
}
```

Added in v0.0.1

# Model

## SchemaExt (interface)

**Signature**

```ts
export interface SchemaExt<A> {
  <S>(S: SchemableExt<S>): HKT<S, A>
}
```

Added in v0.0.1
