---
title: DateFromInt
nav_order: 29
parent: schemata
---

## DateFromInt overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Conversion](#conversion)
  - [DateFromInt](#datefromint)

---

# Conversion

## DateFromInt

Represents Date objects derived from time in milliseconds.

**Signature**

```ts
export declare const DateFromInt: Schema<
  Opaque<number, IntBrand<-8640000000000000, 8640000000000000>>,
  Opaque<Date, { readonly SafeDate: unique symbol }>
>
```

Added in v1.0.0
