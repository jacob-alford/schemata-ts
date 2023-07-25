---
title: schemata/Array.ts
nav_order: 12
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
export declare const Array: (
  params?: ArrayParams
) => <E, A>(codomain: Schema<E, A>) => Schema<readonly E[], readonly A[]>
```

Added in v1.0.0
