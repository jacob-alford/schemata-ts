---
title: schemables/WithInt/instances/task-decoder.ts
nav_order: 65
parent: Modules
---

## task-decoder overview

Integer branded newtype. Parameters: min, max are inclusive.

Represents integers:

```math
 { z | z ∈ ℤ, z >= -2 ** 53 + 1, z <= 2 ** 53 - 1 }
```

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Instances](#instances)
  - [TaskDecoder](#taskdecoder)

---

# Instances

## TaskDecoder

**Signature**

```ts
export declare const TaskDecoder: WithInt2C<'io-ts/TaskDecoder', unknown>
```

Added in v1.0.0
