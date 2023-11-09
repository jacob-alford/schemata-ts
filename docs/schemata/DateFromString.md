---
title: DateFromString
nav_order: 32
parent: schemata
---

## DateFromString overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Conversion](#conversion)
  - [DateFromString](#datefromstring)

---

# Conversion

## DateFromString

Parses any string parseable with `Date.parse` to a `Date` object.

**Signature**

```ts
export declare const DateFromString: (params?: DateParams | undefined) => Schema<SafeDateString, SafeDate>
```

Added in v1.0.0
