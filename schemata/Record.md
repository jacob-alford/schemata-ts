---
title: Record
nav_order: 73
parent: schemata
---

## Record overview

Added in v1.4.0

---

<h2 class="text-delta">Table of contents</h2>

- [Combinators](#combinators)
  - [Record](#record)

---

# Combinators

## Record

A Typescript Record type with string-keys and known values.

Additional parameter `mergeStrategy` determines how to merge values for when keys are
remapped to the same string

**Signature**

```ts
export declare const Record: <K extends string, I, O>(
  keys: Schema<K, K>,
  codomain: Schema<I, O>,
  mergeStrategy?: 'first' | 'last' | MergeStrategy
) => Schema<Readonly<Record<K, I>>, Readonly<Record<K, O>>>
```

Added in v1.0.0
