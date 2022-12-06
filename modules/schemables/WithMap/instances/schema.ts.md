---
title: schemables/WithMap/instances/schema.ts
nav_order: 83
parent: Modules
---

## schema overview

Represents a ReadonlyMap converted from an expected array of entries.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Instances](#instances)
  - [Schema](#schema)

---

# Instances

## Schema

**Signature**

```ts
export declare const Schema: <EK, EA, K extends EK, A extends EA>(
  ordK: Ord.Ord<K>,
  sK: SC.SchemaExt<EK, K>,
  sA: SC.SchemaExt<EA, A>
) => SC.SchemaExt<readonly (readonly [EK, EA])[], ReadonlyMap<K, A>>
```

Added in v1.0.0
