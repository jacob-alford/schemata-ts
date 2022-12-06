---
title: schemables/WithInt/instances/guard.ts
nav_order: 63
parent: Modules
---

## guard overview

Integer branded newtype. Parameters: min, max are inclusive.

Represents integers:

```math
 { z | z ∈ ℤ, z >= -2 ** 53 + 1, z <= 2 ** 53 - 1 }
```

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Instances](#instances)
  - [Guard](#guard)

---

# Instances

## Guard

**Signature**

```ts
export declare const Guard: WithInt1<'io-ts/Guard'>
```

Added in v1.0.0
