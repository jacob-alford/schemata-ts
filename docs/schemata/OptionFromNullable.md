---
title: OptionFromNullable
nav_order: 63
parent: schemata
---

## OptionFromNullable overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Conversion](#conversion)
  - [OptionFromNullable](#optionfromnullable)

---

# Conversion

## OptionFromNullable

Represents an optional type which decodes from null and undefined and encodes to null

**Signature**

```ts
export declare const OptionFromNullable: <A, O>(
  inner: Schema<O, A>
) => ImplicitOptional & Schema<O | null | undefined, O.Option<NonNullable<A>>>
```

Added in v1.0.0
