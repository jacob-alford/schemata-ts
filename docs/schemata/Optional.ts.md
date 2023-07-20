---
title: schemata/Optional.ts
nav_order: 51
parent: Modules
---

## Optional overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Combinators](#combinators)
  - [Optional](#optional)

---

# Combinators

## Optional

A schema for widening the type of a schema to include `undefined`. Also marks the input
property of a struct as optional.

**Signature**

```ts
export declare const Optional: <O, A>(target: any) => any
```

Added in v1.0.0
