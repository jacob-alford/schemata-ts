---
title: Struct
nav_order: 79
parent: schemata
---

## Struct overview

Added in v1.4.0

---

<h2 class="text-delta">Table of contents</h2>

- [Combinators](#combinators)
  - [Struct](#struct)

---

# Combinators

## Struct

Used to construct a struct schema with enumerated keys.

**Note:** Index signatures must accomodate the input/output types for all other
enumerated keys. It will decode properly otherwise, but TypeScript will not permit
construction of such a type

**Note:** The second parameter `extraProps` is deprecated, use `Struct({}).strict()` or
`Struct({}).addIndexSignature()` instead

**Signature**

```ts
export declare const Struct: <T extends Record<string, Schema<any, any>>, Ix extends IxSigBase = undefined>(
  props: T,
  extraProps?: ExtraProps<Ix>
) => StructSchema<T, Ix>
```

Added in v1.0.0
