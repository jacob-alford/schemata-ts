---
title: schemables/WithRefine/instances/schema.ts
nav_order: 131
parent: Modules
---

## schema overview

Re-export of `WithRefine` from `io-ts/Schemable/WithRefine`

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
export declare const Schema: <A, B>(
  refinement: Refinement<A, B>,
  id: string
) => <O>(from: SC.SchemaExt<O, A>) => SC.SchemaExt<O, B>
```

Added in v1.0.0
