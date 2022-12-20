---
title: schemata/string/Base64Url.ts
nav_order: 49
parent: Modules
---

## Base64Url overview

Representing a URL-safe, Base64 encoded string.

For a non-URL-safe alternative, @see Base64

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [Base64Url (type alias)](#base64url-type-alias)
  - [Base64UrlS (type alias)](#base64urls-type-alias)
- [Pattern](#pattern)
  - [base64Url](#base64url)
- [Schema](#schema)
  - [Base64Url](#base64url)

---

# Model

## Base64Url (type alias)

Representing a URL-safe, Base64 encoded string.

For a non-URL-safe alternative, @see Base64

**Signature**

```ts
export type Base64Url = Branded<string, Base64UrlBrand>
```

Added in v1.0.0

## Base64UrlS (type alias)

**Signature**

```ts
export type Base64UrlS = SchemaExt<string, Base64Url>
```

Added in v1.0.0

# Pattern

## base64Url

/^[A-Za-z0-9_-]\*$/

**Signature**

```ts
export declare const base64Url: PB.Pattern
```

Added in v1.0.0

# Schema

## Base64Url

Representing a URL-safe, Base64 encoded string.

For a non-URL-safe alternative, @see Base64

**Signature**

```ts
export declare const Base64Url: Base64UrlS
```

Added in v1.0.0
