---
title: String
nav_order: 80
parent: schemata
---

## String overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [String](#string)
  - [String](#string-1)
- [Transformations](#transformations)
  - [StringSchema (class)](#stringschema-class)
    - [brand (property)](#brand-property)
    - [minLength (property)](#minlength-property)
    - [maxLength (property)](#maxlength-property)
    - [errorName (property)](#errorname-property)

---

# String

## String

Represents string inputs / outputs

**Signature**

```ts
export declare const String: (params?: StringParams | undefined) => StringSchema
```

Added in v1.0.0

# Transformations

## StringSchema (class)

The StringSchema transformer class, use instead `S.String` function to create a StringSchema

**Signature**

```ts
export declare class StringSchema {
  constructor(private readonly params?: StringParams)
}
```

Added in v2.2.0

### brand (property)

Brands this string schema with a certain brand

**Signature**

```ts
readonly brand: <Brand>() => Schema<Opaque<string, Brand>, Opaque<string, Brand>>
```

Added in v2.2.0

### minLength (property)

Sets the minimum required length of the string

**Signature**

```ts
readonly minLength: (minLength: number) => StringSchema
```

Added in v2.2.0

### maxLength (property)

Sets the maximum required length of the string

**Signature**

```ts
readonly maxLength: (maxLength: number) => StringSchema
```

Added in v2.2.0

### errorName (property)

Overrides the 'expected' field in TranscodeError > TypeMismatch

**Signature**

```ts
readonly errorName: (errorName: string) => StringSchema
```

Added in v2.2.0
