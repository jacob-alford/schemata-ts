---
title: schemata/string/Jwt.ts
nav_order: 58
parent: Modules
---

## Jwt overview

A valid, Base64-encoded JWT.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [Jwt (type alias)](#jwt-type-alias)
  - [JwtS (type alias)](#jwts-type-alias)
- [Pattern](#pattern)
  - [jwt](#jwt)
- [Schema](#schema)
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

## JwtS (type alias)

**Signature**

```ts
export type JwtS = SchemaExt<string, Jwt>
```

Added in v1.0.0

# Pattern

## jwt

/^(base64).(base64)(.(base64)){0,1}$/

**Signature**

```ts
export declare const jwt: PB.Pattern
```

Added in v1.0.0

# Schema

## Jwt

A valid, Base64-encoded JWT.

**Signature**

```ts
export declare const Jwt: JwtS
```

Added in v1.0.0
