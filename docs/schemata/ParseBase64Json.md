---
title: ParseBase64Json
nav_order: 67
parent: schemata
---

## ParseBase64Json overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Printer Parsers](#printer-parsers)
  - [ParseBase64Json](#parsebase64json)

---

# Printer Parsers

## ParseBase64Json

Parses a base64-encoded and (URIComponent) escaped JSON string.

**Signature**

```ts
export declare const ParseBase64Json: <I, O>(inner: Schema<I, O>) => Schema<Const<Opaque<string, Base64Brand>, I>, O>
```

Added in v2.0.0
