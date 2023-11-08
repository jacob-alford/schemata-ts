---
title: Refine
nav_order: 76
parent: schemata
---

## Refine overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Combinators](#combinators)
  - [Refine](#refine)

---

# Combinators

## Refine

Used to refine a type to a subtype using a predicate function.

**Signature**

```ts
export declare const Refine: <A, B extends A>(
  refinement: (a: A) => a is B,
  refinedName: string
) => <I>(from: Schema<I, A>) => Schema<I, B>
```

Added in v1.0.0
