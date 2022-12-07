---
title: schemables/WithFloat/instances/decoder.ts
nav_order: 51
parent: Modules
---

## decoder overview

Floating point branded newtype. Parameters: min, max are inclusive.

Represents floating point numbers:

```math
 { f | f ∈ ℝ, f >= -Number.MAX_VALUE, f <= Number.MAX_VALUE }
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
export declare const Decoder: WithFloat2C<'io-ts/Decoder', unknown>
```

Added in v1.0.0
