---
title: Unit
nav_order: 84
parent: schemata
---

## Unit overview

Added in v2.1.0

---

<h2 class="text-delta">Table of contents</h2>

- [Unit](#unit)
  - [Unit](#unit-1)

---

# Unit

## Unit

Represents a type with a single inhabitant, undefined.

Transcoders will permit any input and map it to `void`. Useful for decoding return
types where the value is not intended to be used.

**Signature**

```ts
export declare const Unit: Schema<void, void>
```

Added in v2.1.0
