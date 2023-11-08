---
title: MapFromEntries
nav_order: 51
parent: schemata
---

## MapFromEntries overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Combinators](#combinators)
  - [MapFromEntries](#mapfromentries)

---

# Combinators

## MapFromEntries

A Schema for converting an array of key/value pairs to a map

**Signature**

```ts
export declare const MapFromEntries: <EK, EA, K extends EK, A>(
  ordK: Ord.Ord<K>,
  sK: Schema<EK, K>,
  sA: Schema<EA, A>,
  mergeStrategy?: 'first' | 'last'
) => Schema<readonly (readonly [EK, EA])[], ReadonlyMap<K, A>>
```

Added in v1.0.0
