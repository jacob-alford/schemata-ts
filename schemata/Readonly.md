---
title: Readonly
nav_order: 71
parent: schemata
---

## Readonly overview

Added in v1.4.0

---

<h2 class="text-delta">Table of contents</h2>

- [Combinators](#combinators)
  - [Readonly](#readonly)

---

# Combinators

## Readonly

Marks a schema as readonly.

**Signature**

```ts
export declare const Readonly: <I, O>(inner: Schema<I, O>) => Schema<Readonly<I>, Readonly<O>>
```

Added in v1.0.0
