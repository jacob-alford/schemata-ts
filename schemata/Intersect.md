---
title: Intersect
nav_order: 43
parent: schemata
---

## Intersect overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Combinators](#combinators)
  - [~~Intersect~~](#intersect)

---

# Combinators

## ~~Intersect~~

An intersection of two struct-derived types.

**Signature**

```ts
export declare const Intersect: <
  I1 extends Record<string, any>,
  I2 extends Record<string, any>,
  O1 extends Record<string, any>,
  O2 extends Record<string, any>
>(
  x: Schema<I1, O1>,
  y: Schema<I2, O2>
) => Schema<I1 & I2, O1 & O2>
```

Added in v1.0.0
