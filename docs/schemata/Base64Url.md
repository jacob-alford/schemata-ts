---
title: Base64Url
nav_order: 16
parent: schemata
---

## Base64Url overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [Base64Url (type alias)](#base64url-type-alias)
- [String](#string)
  - [Base64Url](#base64url)

---

# Model

## Base64Url (type alias)

Represents a URL-safe, Base64 encoded string.

For a non-URL-safe alternative, @see Base64

**Signature**

```ts
export type Base64Url = Branded<string, Base64UrlBrand>
```

Added in v1.0.0

# String

## Base64Url

Represents a URL-safe, Base64 encoded string.

For a non-URL-safe alternative, @see Base64

**Signature**

```ts
export declare const Base64Url: Schema<Opaque<string, Base64UrlBrand>, Opaque<string, Base64UrlBrand>>
```

Added in v1.0.0
