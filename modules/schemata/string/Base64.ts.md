---
title: schemata/string/Base64.ts
nav_order: 54
parent: Modules
---

## Base64 overview

Representing a Base64-encoded string.

For a URL-safe version, @see Base64UrlSafe module

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [Base64 (type alias)](#base64-type-alias)
  - [Base64S (type alias)](#base64s-type-alias)
- [Pattern](#pattern)
  - [base64](#base64)
- [Schema](#schema)
  - [Base64](#base64)

---

# Model

## Base64 (type alias)

Representing a Base64-encoded string.

For a URL-safe version, @see Base64UrlSafe module

**Signature**

```ts
export type Base64 = Branded<string, Base64Brand>
```

Added in v1.0.0

## Base64S (type alias)

**Signature**

```ts
export type Base64S = SchemaExt<string, Base64>
```

Added in v1.0.0

# Pattern

## base64

/^([A-Za-z0-9+/]\*?([=]{0,2}))$/

**Signature**

```ts
export declare const base64: PB.Pattern
```

Added in v1.0.0

# Schema

## Base64

Representing a Base64-encoded string.

For a URL-safe version, @see Base64UrlSafe module

**Signature**

```ts
export declare const Base64: Base64S
```

Added in v1.0.0
