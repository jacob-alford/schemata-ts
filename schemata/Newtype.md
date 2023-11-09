---
title: Newtype
nav_order: 55
parent: schemata
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
  iso: Nt.NewtypeIso<N, Nt.CarrierOf<N>>,
  name?: string | undefined
) => <O>(innerType: Schema<O, Nt.CarrierOf<N>>) => Schema<O, N>
```

Added in v1.4.0
