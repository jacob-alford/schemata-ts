---
title: EmailAddress
nav_order: 35
parent: schemata
---

## EmailAddress overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [EmailAddress (type alias)](#emailaddress-type-alias)
- [String](#string)
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

# String

## EmailAddress

Represents strings (email addresses) that conform to the RFC 5322 standard.

**Signature**

```ts
export declare const EmailAddress: Schema<Opaque<string, EmailAddressBrand>, Opaque<string, EmailAddressBrand>>
```

Added in v1.0.0
