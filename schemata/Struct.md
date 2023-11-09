---
title: Struct
nav_order: 83
parent: schemata
---

## Struct overview

Added in v1.4.0

---

<h2 class="text-delta">Table of contents</h2>

- [Combinators](#combinators)
  - [Struct](#struct)
- [Transformations](#transformations)
  - [StructSchema (class)](#structschema-class)
    - [pick (property)](#pick-property)
    - [omit (property)](#omit-property)
    - [partial (property)](#partial-property)
    - [partialOption (property)](#partialoption-property)
    - [readonly (property)](#readonly-property)
    - [strict (property)](#strict-property)
    - [addIndexSignature (property)](#addindexsignature-property)
    - [extend (property)](#extend-property)
    - [intersect (property)](#intersect-property)

---

# Combinators

## Struct

Used to construct a struct schema with enumerated keys.

**Note:** Index signatures must accomodate the input/output types for all other
enumerated keys. It will decode properly otherwise, but TypeScript will not permit
construction of such a type

**Note:** The second parameter `extraProps` is deprecated, use `Struct({}).strict()` or
`Struct({}).addIndexSignature()` instead

**Signature**

```ts
export declare const Struct: <T extends Record<string, Schema<any, any>>, Ix extends IxSigBase = undefined>(
  props: T,
  extraProps?: ExtraProps<Ix>
) => StructSchema<T, Ix>
```

Added in v1.0.0

# Transformations

## StructSchema (class)

Use `Struct({})` schema combinator instead

**Signature**

```ts
export declare class StructSchema<T, Ix> {
  constructor(public readonly definition: T, private readonly indexSignature?: ExtraProps<Ix>)
}
```

Added in v2.1.0

### pick (property)

Re-declares a StructSchema by only including specified properties.

Returns a new `StructSchema`

**Signature**

```ts
readonly pick: <K extends keyof T>(...keys: readonly K[]) => StructSchema<{ [KeyType in keyof Pick<T, K>]: Pick<T, K>[KeyType]; }, Ix>
```

Added in v2.1.0

### omit (property)

Re-declares a StructSchema by excluding specified properties.

Returns a new `StructSchema`

**Signature**

```ts
readonly omit: <K extends keyof T>(...keys: readonly K[]) => StructSchema<{ [KeyType in keyof Pick<T, Exclude<keyof T, K>>]: Pick<T, Exclude<keyof T, K>>[KeyType]; }, Ix>
```

Added in v2.1.0

### partial (property)

Marks all properties as optional; applies `Partial` to both input and output types.

Returns a new schema.

**Signature**

```ts
readonly partial: () => Schema<Simplify<Partial<Input<T, Ix>>>, Simplify<Partial<Output<T, Ix>>>>
```

Added in v2.1.0

### partialOption (property)

A variant of `partial` that applies `Partial` to input properties and maps each
output property to the fp-ts `Option` type.

Returns a new schema.

**Signature**

```ts
readonly partialOption: () => Schema<Simplify<Partial<Input<T, Ix>>>, Simplify<OptionOutput<T, Ix>>>
```

Added in v2.1.0

### readonly (property)

Marks all properties as readonly; applies `Readonly` to both input and output types.

Returns a new schema.

**Signature**

```ts
readonly readonly: () => Schema<Simplify<Readonly<Input<T, Ix>>>, Simplify<Readonly<Output<T, Ix>>>>
```

Added in v2.1.0

### strict (property)

Sets a Struct Schema's index signature to be strict

Returns a new `StructSchema`.

**Signature**

```ts
readonly strict: () => StructSchema<T, undefined>
```

Added in v2.1.0

### addIndexSignature (property)

Adds an index signature to a Struct Schema.

Returns a new `StructSchema`.

**Signature**

```ts
readonly addIndexSignature: <Ix2 extends Schema<any, any>>(indexSignature: Ix2) => StructSchema<T, Ix2>
```

Added in v2.1.0

### extend (property)

Extends a Struct Schema with additional properties. Keys specified in `props` will
overwrite keys in `this`.

Returns a new `StructSchema`.

**Signature**

```ts
readonly extend: <T2 extends Record<string, Schema<any, any>>>(props: T2) => StructSchema<Spread<T, T2>, Ix>
```

Added in v2.1.0

### intersect (property)

Intersects the present Struct Schema with another effectively concatenating their
keys. Keys in `this` will be overwritten with identical keys in `that`.

**Note:** The index signature of `that` will be discarded.

Returns a new `StructSchema`.

**Signature**

```ts
readonly intersect: <T2 extends Record<string, Schema<any, any>>>(that: StructSchema<T2, any>) => StructSchema<Spread<T, T2>, Ix>
```

Added in v2.1.0
