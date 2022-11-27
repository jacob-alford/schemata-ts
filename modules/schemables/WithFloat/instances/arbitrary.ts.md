---
title: schemables/WithFloat/instances/arbitrary.ts
nav_order: 48
parent: Modules
---

## arbitrary overview

Floating point branded newtype. Parameters: min, max are inclusive.

Represents floating point numbers:

```math
 { f | f ∈ ℝ, f >= -Number.MAX_VALUE, f <= Number.MAX_VALUE }
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
export declare const Arbitrary: WithFloat1<'Arbitrary'>
```

Added in v1.0.0
