---
title: schemata/MapFromEntries.ts
nav_order: 38
parent: Modules
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
  sK: any,
  sA: any,
  mergeStrategy?: 'first' | 'last'
) => any
```

Added in v1.0.0
