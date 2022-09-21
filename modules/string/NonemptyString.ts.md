---
title: string/NonemptyString.ts
nav_order: 24
parent: Modules
---

## NonemptyString overview

Represents strings that are not empty strings.

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
  - [NonemptyString (type alias)](#nonemptystring-type-alias)
  - [SchemableParams (type alias)](#schemableparams-type-alias)
  - [SchemableParams1 (type alias)](#schemableparams1-type-alias)
  - [SchemableParams2C (type alias)](#schemableparams2c-type-alias)
- [Refinements](#refinements)
  - [isNonemptyString](#isnonemptystring)

---

# Instances

## Decoder

**Signature**

```ts
export declare const Decoder: D.Decoder<unknown, NonemptyString>
```

Added in v0.0.1

## Eq

**Signature**

```ts
export declare const Eq: Eq_.Eq<NonemptyString>
```

Added in v0.0.1

## Guard

**Signature**

```ts
export declare const Guard: G.Guard<unknown, NonemptyString>
```

Added in v0.0.1

## TaskDecoder

**Signature**

```ts
export declare const TaskDecoder: TD.TaskDecoder<unknown, NonemptyString>
```

Added in v0.0.1

## Type

**Signature**

```ts
export declare const Type: t.Type<NonemptyString>
```

Added in v0.0.1

# Model

## NonemptyString (type alias)

Represents strings that are not empty strings.

**Signature**

```ts
export type NonemptyString = string & NonemptyStringBrand
```

Added in v0.0.1

## SchemableParams (type alias)

**Signature**

```ts
export type SchemableParams<S> = HKT<S, NonemptyString>
```

Added in v0.0.1

## SchemableParams1 (type alias)

**Signature**

```ts
export type SchemableParams1<S extends URIS> = Kind<S, NonemptyString>
```

Added in v0.0.1

## SchemableParams2C (type alias)

**Signature**

```ts
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, NonemptyString>
```

Added in v0.0.1

# Refinements

## isNonemptyString

**Signature**

```ts
export declare const isNonemptyString: (s: string) => s is NonemptyString
```

Added in v0.0.1
