---
title: schemables/WithInt/instances/encoder.ts
nav_order: 62
parent: Modules
---

## encoder overview

Integer branded newtype. Parameters: min, max are inclusive.

Represents integers:

```math
 { z | z ∈ ℤ, z >= -2 ** 53 + 1, z <= 2 ** 53 - 1 }
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
export declare const Encoder: WithInt2<'io-ts/Encoder'>
```

Added in v1.0.0
