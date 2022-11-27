---
title: schemables/WithFloat/instances/task-decoder.ts
nav_order: 54
parent: Modules
---

## task-decoder overview

Floating point branded newtype. Parameters: min, max are inclusive.

Represents floating point numbers:

```math
 { f | f ∈ ℝ, f >= -Number.MAX_VALUE, f <= Number.MAX_VALUE }
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
export declare const TaskDecoder: WithFloat2C<'io-ts/TaskDecoder', unknown>
```

Added in v1.0.0
