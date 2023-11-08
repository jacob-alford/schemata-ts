---
title: Array
nav_order: 13
parent: schemata
---

## Array overview

Added in v1.4.0

---

<h2 class="text-delta">Table of contents</h2>

- [Combinators](#combinators)
  - [Array](#array)

---

# Combinators

## Array

An array type of known values.

**Signature**

```ts
export declare const Array: <E, A>(codomain: Schema<E, A>, params?: ArrayParams) => Schema<readonly E[], readonly A[]>
```

Added in v1.0.0
