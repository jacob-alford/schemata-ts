---
title: schemables/WithBrand/instances/schema.ts
nav_order: 26
parent: Modules
---

## schema overview

Schemable for constructing a branded newtype

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Combinators](#combinators)
  - [Schema](#schema)

---

# Combinators

## Schema

**Signature**

```ts
export declare const Schema: <B>() => <O, A>(target: SC.SchemaExt<O, A>) => SC.SchemaExt<O, Branded<A, B>>
```

Added in v1.0.0
