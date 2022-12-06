---
title: schemables/WithFloat/instances/guard.ts
nav_order: 53
parent: Modules
---

## guard overview

Floating point branded newtype. Parameters: min, max are inclusive.

Represents floating point numbers:

```math
 { f | f ∈ ℝ, f >= -Number.MAX_VALUE, f <= Number.MAX_VALUE }
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
export declare const Guard: WithFloat1<'io-ts/Guard'>
```

Added in v1.0.0
