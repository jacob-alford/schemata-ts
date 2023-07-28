---
title: ParseJsonString
nav_order: 66
parent: schemata
---

## ParseJsonString overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Printer Parsers](#printer-parsers)
  - [ParseJsonString](#parsejsonstring)

---

# Printer Parsers

## ParseJsonString

Parses a Json string using supplied schema

**Signature**

```ts
export declare const ParseJsonString: <I, O>(
  inner: Schema<I, O>
) => Schema<Const<Opaque<string, { JsonString: unique symbol }>, I>, O>
```

Added in v2.0.0
