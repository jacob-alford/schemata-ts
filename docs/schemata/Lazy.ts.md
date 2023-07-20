---
title: schemata/Lazy.ts
nav_order: 36
parent: Modules
---

## Lazy overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Combinators](#combinators)
  - [Lazy](#lazy)

---

# Combinators

## Lazy

A lazy schema is a schema for mutual recursive types.

**Note: deriving mutually recursive arbitraries is not currently supported**

**Signature**

```ts
export declare const Lazy: <I, O>(name: string, f: LazyArg<any>) => any
```

Added in v1.0.0
