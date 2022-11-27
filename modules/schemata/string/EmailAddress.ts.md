---
title: schemata/string/EmailAddress.ts
nav_order: 166
parent: Modules
---

## EmailAddress overview

Represents strings (email addresses) that conform to the RFC 5322 standard.

See: https://emailregex.com/

**Note: Does not validate international addresses**

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [EmailAddress (type alias)](#emailaddress-type-alias)
  - [EmailAddressS (type alias)](#emailaddresss-type-alias)
- [Pattern](#pattern)
  - [emailAddress](#emailaddress)
- [Schema](#schema)
  - [EmailAddress](#emailaddress)

---

# Model

## EmailAddress (type alias)

Represents strings (email addresses) that conform to the RFC 5322 standard.

**Signature**

```ts
export type EmailAddress = Branded<string, EmailAddressBrand>
```

Added in v1.0.0

## EmailAddressS (type alias)

**Signature**

```ts
export type EmailAddressS = SchemaExt<string, EmailAddress>
```

Added in v1.0.0

# Pattern

## emailAddress

**Signature**

```ts
export declare const emailAddress: PB.Pattern
```

Added in v1.0.0

# Schema

## EmailAddress

Represents strings (email addresses) that conform to the RFC 5322 standard.

**Signature**

```ts
export declare const EmailAddress: EmailAddressS
```

Added in v1.0.0
