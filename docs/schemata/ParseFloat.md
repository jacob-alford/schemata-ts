---
title: ParseFloat
nav_order: 67
parent: schemata
---

## ParseFloat overview

Added in v2.2.0

---

<h2 class="text-delta">Table of contents</h2>

- [Printer Parsers](#printer-parsers)
  - [ParseFloat](#parsefloat)

---

# Printer Parsers

## ParseFloat

Parses a string into an float. A slightly more performant variant of the now deprecated
`S.FloatFromString` with the additional ability to specify `min` / `max` bounds.

**Signature**

```ts
export declare const ParseFloat: <
  Min extends number | undefined = undefined,
  Max extends number | undefined = undefined
>(
  params?: NumberParams<Min, Max> | undefined
) => Schema<
  Opaque<
    string,
    {
      readonly FloatString: unique symbol
      readonly Min: Min extends undefined ? -1.7976931348623157e308 : Min
      readonly Max: Max extends undefined ? 1.7976931348623157e308 : Max
    }
  >,
  Opaque<
    number,
    FloatBrand<
      Min extends undefined ? -1.7976931348623157e308 : Min,
      Max extends undefined ? 1.7976931348623157e308 : Max
    >
  >
>
```

Added in v2.2.0
