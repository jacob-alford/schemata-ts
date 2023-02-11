---
title: struct.ts
nav_order: 63
parent: Modules
---

## struct overview

A meta definition for a struct for use with `StructM` schema

Added in v1.3.0

---

<h2 class="text-delta">Table of contents</h2>

- [Combinators](#combinators)
  - [mapKeyTo](#mapkeyto)
- [Constructors](#constructors)
  - [defineStruct](#definestruct)
  - [optional](#optional)
  - [required](#required)
- [Guards](#guards)
  - [isOptionalFlag](#isoptionalflag)
  - [isRequiredFlag](#isrequiredflag)
  - [keyIsNotMapped](#keyisnotmapped)
- [Model](#model)
  - [KeyFlag (type alias)](#keyflag-type-alias)
  - [KeyNotMapped (type alias)](#keynotmapped-type-alias)
  - [OptionalKeyFlag (type alias)](#optionalkeyflag-type-alias)
  - [Prop (interface)](#prop-interface)
  - [Prop1 (interface)](#prop1-interface)
  - [Prop2 (interface)](#prop2-interface)
  - [RequiredKeyFlag (type alias)](#requiredkeyflag-type-alias)
- [Utilities](#utilities)
  - [complete](#complete)
  - [omit](#omit)
  - [partial](#partial)
  - [pick](#pick)

---

# Combinators

## mapKeyTo

Used to remap a property's key to a new key in the output type

**Signature**

```ts
export declare const mapKeyTo: MapKeyTo
```

Added in v1.3.0

# Constructors

## defineStruct

**Signature**

```ts
export declare const defineStruct: StructDefinition
```

Added in v1.3.0

## optional

Indicates that a property is optional

**Signature**

```ts
export declare const optional: Optional
```

Added in v1.3.0

## required

Indicates that a property is required

**Signature**

```ts
export declare const required: Required
```

Added in v1.3.0

# Guards

## isOptionalFlag

**Signature**

```ts
export declare const isOptionalFlag: (flag: KeyFlag) => flag is 'Optional'
```

Added in v1.3.0

## isRequiredFlag

**Signature**

```ts
export declare const isRequiredFlag: (flag: KeyFlag) => flag is 'Required'
```

Added in v1.3.0

## keyIsNotMapped

**Signature**

```ts
export declare const keyIsNotMapped: (key: string | KeyNotMapped) => key is typeof KeyNotMapped
```

Added in v1.3.0

# Model

## KeyFlag (type alias)

**Signature**

```ts
export type KeyFlag = OptionalKeyFlag | RequiredKeyFlag
```

Added in v1.3.0

## KeyNotMapped (type alias)

**Signature**

```ts
export type KeyNotMapped = typeof KeyNotMapped
```

Added in v1.3.0

## OptionalKeyFlag (type alias)

**Signature**

```ts
export type OptionalKeyFlag = 'Optional'
```

Added in v1.3.0

## Prop (interface)

Meta information for an HKT2 for if the key is optional or required, and if the key is remapped

**Signature**

```ts
export interface Prop<Flag extends KeyFlag, S, Val extends HKT2<S, any, any>, K extends string | KeyNotMapped> {
  readonly _flag: Flag
  readonly _keyRemap: K
  readonly _val: Val
}
```

Added in v1.3.0

## Prop1 (interface)

Meta information for a Kind for if the key is optional or required, and if the key is remapped

**Signature**

```ts
export interface Prop1<
  Flag extends KeyFlag,
  S extends URIS,
  Val extends Kind<S, any>,
  K extends string | KeyNotMapped
> {
  readonly _flag: Flag
  readonly _keyRemap: K
  readonly _val: Val
}
```

Added in v1.3.0

## Prop2 (interface)

Meta information for a Kind2 for if the key is optional or required, and if the key is remapped

**Signature**

```ts
export interface Prop2<
  Flag extends KeyFlag,
  S extends URIS2,
  Val extends Kind2<S, any, any>,
  K extends string | KeyNotMapped
> {
  readonly _flag: Flag
  readonly _keyRemap: K
  readonly _val: Val
}
```

Added in v1.3.0

## RequiredKeyFlag (type alias)

**Signature**

```ts
export type RequiredKeyFlag = 'Required'
```

Added in v1.3.0

# Utilities

## complete

Marks all properties as required.

**Signature**

```ts
export declare const complete: Complete
```

Added in v1.3.0

## omit

Exclude a set of keys from an object. Built for StructM but works with any struct

**Signature**

```ts
export declare const omit: <A extends Record<string, unknown>, Keys extends [keyof A, ...Exclude<keyof A, Keys[0]>[]]>(
  ...omittedKeys: Keys
) => (obj: A) => { [K in Exclude<keyof A, Keys[number]>]: A[K] }
```

Added in v1.3.0

## partial

Marks all properties as optional

**Signature**

```ts
export declare const partial: Partial
```

Added in v1.3.0

## pick

Include only a specified set of keys of an object. Built for StructM but works with any struct

**Signature**

```ts
export declare const pick: <A extends Record<string, unknown>, Keys extends [keyof A, ...Exclude<keyof A, Keys[0]>[]]>(
  ...keys: Keys
) => (obj: A) => { [K in Keys[number]]: A[K] }
```

Added in v1.3.0
