---
title: DateFromIsoString
nav_order: 31
parent: schemata
---

## DateFromIsoString overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Conversion](#conversion)
  - [DateFromIsoString](#datefromisostring)
- [Model](#model)
  - [DateFromIsoStringParams (type alias)](#datefromisostringparams-type-alias)
- [Pattern](#pattern)
  - [minutesSeconds](#minutesseconds)

---

# Conversion

## DateFromIsoString

The Date parser (used in DateFromString) accepts different strings depending on
runtime, and also accepts other formats like `February 29, 2022`.

`DateFromIsoString` follows a subset of the [ECMAScript 2023 Language Date Time String
Specification](https://tc39.es/ecma262/#sec-date-time-string-format).

Notable features:

- Requires padded months, days, hours, minutes, and seconds
- Can be configured to require a time, time and timezone offset (e.g. `Z` or `±05:00`) or
  neither (default is require both).
- Dates may contain years, months, and days; years and months; or years
- Times may contain hours, minutes, seconds, and milliseconds; hours, minutes, and
  seconds; or hours and minutes.
- Expanded years are permitted (e.g. `+002022` instead of `2022`)

**Signature**

```ts
export declare const DateFromIsoString: (
  params?: DateFromIsoStringParams | undefined
) => Schema<SafeDateString, SafeDate>
```

Added in v1.0.0

# Model

## DateFromIsoStringParams (type alias)

**Signature**

```ts
export type DateFromIsoStringParams = {
  /**
   * Configuration to require string to include time, time and timezone offset, or neither.
   *
   * - `None` => date, or date-string, or date-string and timezone offset are allowed
   * - `Time` => date-string, or date-string and timezone offset are allowed
   * - `TimeAndOffset` => date-string and timezone offset are required
   *
   * @since 1.0.0
   */
  readonly requireTime?: 'None' | 'Time' | 'TimeAndOffset'
}
```

Added in v1.0.0

# Pattern

## minutesSeconds

E.g. 00, 01, 02, 03, 04, 05, 06, 07, ..., 58, 59

**Signature**

```ts
export declare const minutesSeconds: k.Pattern
```

Added in v1.0.0
