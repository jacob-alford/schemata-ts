---
title: schemables/WithOption/instances/schema.ts
nav_order: 102
parent: Modules
---

## schema overview

Represents an exclusion of a supplied value where the exclusion is mapped to `None`.
Requires an inner schemable, and an Eq instance which defaults to strict equality.

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
export declare const Schema: <A, B, E>(
  exclude: B,
  sa: SC.SchemaExt<E, A>,
  eqA?: Eq<A> | undefined
) => SC.SchemaExt<B | E, Option<A>>
```

Added in v1.0.0
