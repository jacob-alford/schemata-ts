---
title: Array
nav_order: 13
parent: schemata
---

## Array overview

Added in v1.4.0

---

<h2 class="text-delta">Table of contents</h2>

- [Combinators](#combinators)
  - [Array](#array)
- [Transformations](#transformations)
  - [ArraySchema (class)](#arrayschema-class)
    - [minLength (property)](#minlength-property)
    - [maxLength (property)](#maxlength-property)
    - [nonEmpty (property)](#nonempty-property)

---

# Combinators

## Array

An array type of known values.

**Signature**

```ts
export declare const Array: <I, O>(codomain: Schema<I, O>, params?: ArrayParams | undefined) => ArraySchema<I, O>
```

Added in v1.0.0

# Transformations

## ArraySchema (class)

The ArraySchema schema transformer, to construct an ArraySchema use `S.Array` combinator instead.

**Signature**

```ts
export declare class ArraySchema<I, O> {
  constructor(private readonly codomain: Schema<I, O>, private readonly params: ArrayParams = {})
}
```

Added in v2.2.0

### minLength (property)

Requires a minimum array length

Returns a new ArraySchema

**Signature**

```ts
readonly minLength: (minLength: number) => ArraySchema<I, O>
```

Added in v2.2.0

### maxLength (property)

Requires a maximum array length

Returns a new ArraySchema

**Signature**

```ts
readonly maxLength: (maxLength: number) => ArraySchema<I, O>
```

Added in v2.2.0

### nonEmpty (property)

Converts an array schema to a non-empty array schema

Returns a new Schema

**Signature**

```ts
readonly nonEmpty: () => Schema<RNEA.ReadonlyNonEmptyArray<I>, RNEA.ReadonlyNonEmptyArray<O>>
```

Added in v2.2.0
