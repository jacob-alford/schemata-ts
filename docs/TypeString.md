---
title: TypeString.ts
nav_order: 90
permalink: /type-string/
---

## TypeString overview

A tuple of strings where the first element is a string representing the input type of a
schema, and the second element is a string representing the output type of a schema. It
can be overriden using the `Annotate` schema.

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Interpreters](#interpreters)
  - [deriveTypeString](#derivetypestring)
- [Model](#model)
  - [TypeString (type alias)](#typestring-type-alias)
- [URI](#uri)
  - [URI](#uri-1)
  - [URI (type alias)](#uri-type-alias)

---

# Interpreters

## deriveTypeString

Interprets a schema as a type string

**Signature**

```ts
export declare const deriveTypeString: Interpreter<SchemableLambda>
```

Added in v2.0.0

# Model

## TypeString (type alias)

Input / Output type strings for a schema

**Signature**

```ts
export type TypeString<I, O> = Const<readonly [string, string], readonly [I, O]>
```

Added in v2.0.0

# URI

## URI

**Signature**

```ts
export declare const URI: 'schemata-ts/TypeString'
```

Added in v2.0.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0
