---
title: schemata/generic/OptionFromNullable.ts
nav_order: 150
parent: Modules
---

## OptionFromNullable overview

Represents an optional type which encodes to / decodes from null

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [OptionFromNullableS (type alias)](#optionfromnullables-type-alias)
- [Schema](#schema)
  - [OptionFromNullable](#optionfromnullable)

---

# Model

## OptionFromNullableS (type alias)

**Signature**

```ts
export type OptionFromNullableS = <A, O>(sA: SchemaExt<O, A>) => SchemaExt<O | null, O.Option<A>>
```

Added in v1.0.0

# Schema

## OptionFromNullable

Represents an optional type which encodes to / decodes from null

**Signature**

```ts
export declare const OptionFromNullable: OptionFromNullableS
```

Added in v1.0.0
