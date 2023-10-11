---
title: Tuple
nav_order: 82
parent: schemata
---

## Tuple overview

Added in v1.4.0

---

<h2 class="text-delta">Table of contents</h2>

- [Combinators](#combinators)
  - [Tuple](#tuple)
- [Transformations](#transformations)
  - [TupleSchema (class)](#tupleschema-class)
    - [append (property)](#append-property)
    - [prepend (property)](#prepend-property)

---

# Combinators

## Tuple

A schema for n-tuples

**Signature**

```ts
export declare const Tuple: <T extends readonly Schema<any, any>[]>(...items: T) => TupleSchema<T>
```

Added in v1.0.0

# Transformations

## TupleSchema (class)

The TupleSchema transformer class, use instead `Tuple` function

**Signature**

```ts
export declare class TupleSchema<T> {
  constructor(private readonly items: T)
}
```

Added in v2.2.0

### append (property)

Appends items to the end of the tuple

**Signature**

```ts
readonly append: <U extends readonly Schema<any, any>[]>(...items: U) => TupleSchema<readonly [...T, ...U]>
```

Added in v2.2.0

### prepend (property)

Prepends items to the beginning of the tuple

**Signature**

```ts
readonly prepend: <U extends readonly Schema<any, any>[]>(...items: U) => TupleSchema<readonly [...U, ...T]>
```

Added in v2.2.0
