---
title: schemata/Newtype.ts
nav_order: 42
parent: Modules
---

## Newtype overview

Added in v1.4.0

---

<h2 class="text-delta">Table of contents</h2>

- [Combinators](#combinators)
  - [Newtype](#newtype)

---

# Combinators

## Newtype

A schema for wrapping an inner schema's output value in a newtype.

**Signature**

```ts
export declare const Newtype: <N extends Nt.Newtype<any, any>>(
  iso: any,
  name?: string | undefined
) => <O>(innerType: any) => any
```

Added in v1.4.0
