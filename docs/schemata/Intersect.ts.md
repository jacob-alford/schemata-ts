---
title: schemata/Intersect.ts
nav_order: 32
parent: Modules
---

## Intersect overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Combinators](#combinators)
  - [Intersect](#intersect)

---

# Combinators

## Intersect

An intersection of two struct-derived types.

**Signature**

```ts
export declare const Intersect: <
  I1 extends Record<string, any>,
  I2 extends Record<string, any>,
  O1 extends Record<string, any>,
  O2 extends Record<string, any>
>(
  x: any,
  y: any
) => any
```

Added in v1.0.0
