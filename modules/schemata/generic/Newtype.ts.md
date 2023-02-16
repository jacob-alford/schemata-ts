---
title: schemata/generic/Newtype.ts
nav_order: 37
parent: Modules
---

## Newtype overview

A schema for wrapping an inner schema's output value in a newtype.

Added in v1.4.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [NewtypeS (type alias)](#newtypes-type-alias)
- [Schema](#schema)
  - [Newtype](#newtype)

---

# Model

## NewtypeS (type alias)

**Signature**

```ts
export type NewtypeS = <N extends Nt.Newtype<any, any>>(
  iso: Iso<N, Nt.CarrierOf<N>>,
  name: string
) => <O>(innerType: SchemaExt<O, Nt.CarrierOf<N>>) => SchemaExt<O, N>
```

Added in v1.4.0

# Schema

## Newtype

A schema for wrapping an inner schema's output value in a newtype.

**Signature**

```ts
export declare const Newtype: NewtypeS
```

Added in v1.4.0
