---
title: ParseInt
nav_order: 68
parent: schemata
---

## ParseInt overview

Added in v2.2.0

---

<h2 class="text-delta">Table of contents</h2>

- [Printer Parsers](#printer-parsers)
  - [ParseInt](#parseint)

---

# Printer Parsers

## ParseInt

Parses a string into an integer. A slightly more performant variant of the now
deprecated `S.IntFromString` with the additional ability to specify `min` / `max` bounds.

**Signature**

```ts
export declare const ParseInt: <Min extends number | undefined = undefined, Max extends number | undefined = undefined>(
  params?: NumberParams<Min, Max> | undefined
) => Schema<
  Opaque<
    string,
    {
      readonly IntString: unique symbol
      readonly min: Min extends undefined ? -9007199254740991 : Min
      readonly max: Max extends undefined ? 9007199254740991 : Max
    }
  >,
  Opaque<
    number,
    IntBrand<Min extends undefined ? -9007199254740991 : Min, Max extends undefined ? 9007199254740991 : Max>
  >
>
```

Added in v2.2.0
