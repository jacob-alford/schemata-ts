---
title: schemables/WithOptional/instances/schema.ts
nav_order: 100
parent: Modules
---

## schema overview

Schemable for widening a type to include undefined. Similar to nullable but for undefined.

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
export declare const Schema: <O, A>(target: SC.SchemaExt<O, A>) => SC.SchemaExt<O | undefined, A | undefined>
```

Added in v1.0.0
