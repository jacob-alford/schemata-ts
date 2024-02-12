---
title: ParseJsonString
nav_order: 71
parent: schemata
---

## ParseJsonString overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [JsonString (type alias)](#jsonstring-type-alias)
- [Printer Parsers](#printer-parsers)
  - [ParseJsonString](#parsejsonstring)

---

# Model

## JsonString (type alias)

A branded string representing a parsable JSON string

**Signature**

```ts
export type JsonString = _.JsonString
```

Added in v2.2.3

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
