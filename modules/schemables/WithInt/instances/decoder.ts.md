---
title: schemables/WithInt/instances/decoder.ts
nav_order: 60
parent: Modules
---

## decoder overview

Integer branded newtype. Parameters: min, max are inclusive.

Represents integers:

```math
 { z | z ∈ ℤ, z >= -2 ** 53 + 1, z <= 2 ** 53 - 1 }
```

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Instances](#instances)
  - [Decoder](#decoder)

---

# Instances

## Decoder

**Signature**

```ts
export declare const Decoder: WithInt2C<'io-ts/Decoder', unknown>
```

Added in v1.0.0
