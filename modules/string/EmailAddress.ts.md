---
title: string/EmailAddress.ts
nav_order: 13
parent: Modules
---

## EmailAddress overview

Represents strings (email addresses) that conform to the RFC 5322 standard.

See: https://emailregex.com/

**Note: Does not validate international addresses**

Added in v0.0.1

---

<h2 class="text-delta">Table of contents</h2>

- [Instances](#instances)
  - [Decoder](#decoder)
  - [Eq](#eq)
  - [Guard](#guard)
  - [TaskDecoder](#taskdecoder)
  - [Type](#type)
- [Model](#model)
  - [EmailAddress (type alias)](#emailaddress-type-alias)
  - [SchemableParams (type alias)](#schemableparams-type-alias)
  - [SchemableParams1 (type alias)](#schemableparams1-type-alias)
  - [SchemableParams2C (type alias)](#schemableparams2c-type-alias)
- [Refinements](#refinements)
  - [isEmailAddress](#isemailaddress)

---

# Instances

## Decoder

**Signature**

```ts
export declare const Decoder: D.Decoder<unknown, EmailAddress>
```

Added in v0.0.1

## Eq

**Signature**

```ts
export declare const Eq: Eq_.Eq<EmailAddress>
```

Added in v0.0.1

## Guard

**Signature**

```ts
export declare const Guard: G.Guard<unknown, EmailAddress>
```

Added in v0.0.1

## TaskDecoder

**Signature**

```ts
export declare const TaskDecoder: TD.TaskDecoder<unknown, EmailAddress>
```

Added in v0.0.1

## Type

**Signature**

```ts
export declare const Type: t.Type<EmailAddress>
```

Added in v0.0.1

# Model

## EmailAddress (type alias)

Represents strings (email addresses) that conform to the RFC 5322 standard.

See: https://emailregex.com/

**Note: Does not validate international addresses**

**Signature**

```ts
export type EmailAddress = string & EmailAddressBrand
```

Added in v0.0.1

## SchemableParams (type alias)

**Signature**

```ts
export type SchemableParams<S> = HKT<S, EmailAddress>
```

Added in v0.0.1

## SchemableParams1 (type alias)

**Signature**

```ts
export type SchemableParams1<S extends URIS> = Kind<S, EmailAddress>
```

Added in v0.0.1

## SchemableParams2C (type alias)

**Signature**

```ts
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, EmailAddress>
```

Added in v0.0.1

# Refinements

## isEmailAddress

**Signature**

```ts
export declare function isEmailAddress(s: string): s is EmailAddress
```

Added in v0.0.1