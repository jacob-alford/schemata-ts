---
title: Option
nav_order: 61
parent: schemata
---

## Option overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Combinators](#combinators)
  - [Option](#option)

---

# Combinators

## Option

A schema that represents the `Option` type from fp-ts.

**Signature**

```ts
export declare const Option: <I, O>(inner: Schema<I, O>) => Schema<Option_<I>, Option_<O>>
```

Added in v2.0.0
