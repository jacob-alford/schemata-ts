---
title: Literal
nav_order: 48
parent: schemata
---

## Literal overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Combinators](#combinators)
  - [Literal](#literal)

---

# Combinators

## Literal

Represents a union of string, number, boolean, and null literal values

**Signature**

```ts
export declare const Literal: <Literals extends ReadonlyNonEmptyArray<string | number | boolean | null>>(
  ...values: Literals
) => Schema<Literals[number], Literals[number]>
```

Added in v1.0.0
