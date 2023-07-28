---
title: ParseEncodedJson
nav_order: 65
parent: schemata
---

## ParseEncodedJson overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Printer Parsers](#printer-parsers)
  - [ParseEncodedJsonString](#parseencodedjsonstring)

---

# Printer Parsers

## ParseEncodedJsonString

Applies a fallible string mapping function to a schema which parses a Json string.
Useful for things like conversion between character encodings.

**Signature**

```ts
export declare const ParseEncodedJsonString: (
  decode: (encoded: string) => E.Either<unknown, string>,
  encode: (jsonString: string) => E.Either<unknown, string>,
  options?: (ParserOptions & { readonly nameOverride?: string | undefined }) | undefined
) => <I, O>(inner: Schema<I, O>) => Schema<Const<Opaque<string, { JsonString: unique symbol }>, I>, O>
```

Added in v2.0.0
