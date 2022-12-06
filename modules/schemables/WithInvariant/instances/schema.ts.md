---
title: schemables/WithInvariant/instances/schema.ts
nav_order: 74
parent: Modules
---

## schema overview

Invariant mapping for schemable

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
export declare const Schema: <B>(
  guardB: Guard<unknown, B>,
  name: string
) => <A>(f: (a: A) => B, g: (b: B) => A) => <O>(target: SC.SchemaExt<O, A>) => SC.SchemaExt<O, B>
```

Added in v1.0.0
