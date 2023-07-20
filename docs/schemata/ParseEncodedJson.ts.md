---
title: schemata/ParseEncodedJson.ts
nav_order: 55
parent: Modules
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
  options?: ParserOptions & { readonly nameOverride?: string }
) => <I, O>(inner: any) => any
```

Added in v2.0.0
