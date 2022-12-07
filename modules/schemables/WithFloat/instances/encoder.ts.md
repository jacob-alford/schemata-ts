---
title: schemables/WithFloat/instances/encoder.ts
nav_order: 52
parent: Modules
---

## encoder overview

Floating point branded newtype. Parameters: min, max are inclusive.

Represents floating point numbers:

```math
 { f | f ∈ ℝ, f >= -Number.MAX_VALUE, f <= Number.MAX_VALUE }
```

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Instances](#instances)
  - [Encoder](#encoder)

---

# Instances

## Encoder

**Signature**

```ts
export declare const Encoder: WithFloat2<'io-ts/Encoder'>
```

Added in v1.0.0
