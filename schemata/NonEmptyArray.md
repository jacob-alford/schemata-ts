---
title: NonEmptyArray
nav_order: 56
parent: schemata
---

## NonEmptyArray overview

Added in v1.1.0

---

<h2 class="text-delta">Table of contents</h2>

- [Combinators](#combinators)
  - [~~NonEmptyArray~~](#nonemptyarray)

---

# Combinators

## ~~NonEmptyArray~~

A read-only Array containing one or more elements.

**Signature**

```ts
export declare const NonEmptyArray: <A, O>(
  inner: Schema<O, A>
) => Schema<RNEA.ReadonlyNonEmptyArray<O>, RNEA.ReadonlyNonEmptyArray<A>>
```

Added in v1.1.0
