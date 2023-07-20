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

**Signature**

```ts
export declare const Struct: <T extends Record<string, any>>(props: T, extraProps?: 'strip' | 'error') => any
```

Added in v1.0.0
