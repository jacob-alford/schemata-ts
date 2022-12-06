---
title: schemables/WithInt/instances/arbitrary.ts
nav_order: 59
parent: Modules
---

## arbitrary overview

Integer branded newtype. Parameters: min, max are inclusive.

Represents integers:

```math
 { z | z ∈ ℤ, z >= -2 ** 53 + 1, z <= 2 ** 53 - 1 }
```

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Instances](#instances)
  - [Arbitrary](#arbitrary)

---

# Instances

## Arbitrary

**Signature**

```ts
export declare const Arbitrary: WithInt1<'Arbitrary'>
```

Added in v1.0.0
