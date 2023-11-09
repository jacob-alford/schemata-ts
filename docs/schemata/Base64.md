---
title: Base64
nav_order: 15
parent: schemata
---

## Base64 overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [Base64 (type alias)](#base64-type-alias)
- [String](#string)
  - [Base64](#base64)

---

# Model

## Base64 (type alias)

Represents a Base64-encoded string.

For a URL-safe version, @see Base64UrlSafe module

**Signature**

```ts
export type Base64 = Branded<string, Base64Brand>
```

Added in v1.0.0

# String

## Base64

Represents a Base64-encoded string.

For a URL-safe version, @see Base64UrlSafe module

**Signature**

```ts
export declare const Base64: Schema<Opaque<string, Base64Brand>, Opaque<string, Base64Brand>>
```

Added in v1.0.0
