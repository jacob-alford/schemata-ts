---
title: brand.ts
nav_order: 2
permalink: /brand/
---

## brand overview

A branded newtype is a newtype that's assignable to its underlying type; using the type
system to restrict usage of a weaker type where an enforced structure is required.

Branded types are used for nearly all schemata-ts's string types.

Added in v1.4.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [Branded (type alias)](#branded-type-alias)

---

# Model

## Branded (type alias)

A newtype that's assignable to its underlying type.

**Signature**

```ts
export type Branded<A, B> = Opaque<A, B>
```

Added in v1.4.0
