---
title: schemata/Struct.ts
nav_order: 68
parent: Modules
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

**Signature**

```ts
export declare const Struct: <T extends Record<string, any>, IndexSignature extends unknown>(
  props: T,
  extraProps?: IndexSignature | 'strip' | 'error'
) => any
```

Added in v1.0.0
