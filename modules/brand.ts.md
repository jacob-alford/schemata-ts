---
title: brand.ts
nav_order: 12
parent: Modules
---

## brand overview

A port of `io-ts` branded types to schemata-ts

Added in v1.4.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [Brand (interface)](#brand-interface)
  - [Branded (type alias)](#branded-type-alias)

---

# Model

## Brand (interface)

Represents a unique identifier to prevent non-branded types from being assigned to branded types.

**Signature**

```ts
export interface Brand<B> extends Brand_<B> {}
```

Added in v1.4.0

## Branded (type alias)

A newtype that's assignable to its underlying type.

**Signature**

```ts
export type Branded<A, B> = A & Brand<B>
```

Added in v1.4.0
