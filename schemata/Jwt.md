---
title: Jwt
nav_order: 44
parent: schemata
---

## Jwt overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [Jwt (type alias)](#jwt-type-alias)
- [String](#string)
  - [Jwt](#jwt)

---

# Model

## Jwt (type alias)

A valid, Base64-encoded JWT.

**Signature**

```ts
export type Jwt = Branded<string, JwtBrand>
```

Added in v1.0.0

# String

## Jwt

A valid, Base64-encoded JWT.

**Signature**

```ts
export declare const Jwt: Schema<Opaque<string, JwtBrand>, Opaque<string, JwtBrand>>
```

Added in v1.0.0
