---
title: Tuple
nav_order: 80
parent: schemata
---

## Tuple overview

Added in v1.4.0

---

<h2 class="text-delta">Table of contents</h2>

- [Combinators](#combinators)
  - [Tuple](#tuple)

---

# Combinators

## Tuple

A schema for n-tuples

**Signature**

```ts
export declare const Tuple: <T extends readonly Schema<any, any>[]>(
  ...items: T
) => Schema<{ readonly [K in keyof T]: InputOf<T[K]> }, { readonly [K in keyof T]: TypeOf<T[K]> }>
```

Added in v1.0.0
