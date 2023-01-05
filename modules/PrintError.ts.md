---
title: PrintError.ts
nav_order: 25
parent: Modules
---

## PrintError overview

Errors that arise when serializing to JSON

Added in v1.1.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [CircularReference (class)](#circularreference-class)
    - [\_tag (property)](#_tag-property)
  - [ErrorAtIndex (class)](#erroratindex-class)
    - [\_tag (property)](#_tag-property-1)
  - [ErrorAtKey (class)](#erroratkey-class)
    - [\_tag (property)](#_tag-property-2)
  - [ErrorGroup (class)](#errorgroup-class)
    - [\_tag (property)](#_tag-property-3)
  - [InvalidValue (class)](#invalidvalue-class)
    - [\_tag (property)](#_tag-property-4)
  - [NamedError (class)](#namederror-class)
    - [\_tag (property)](#_tag-property-5)
- [Guards](#guards)
  - [isPrintError](#isprinterror)
- [Instances](#instances)
  - [semigroupPrintingError](#semigroupprintingerror)
- [Model](#model)
  - [PrintError (type alias)](#printerror-type-alias)

---

# Constructors

## CircularReference (class)

**Signature**

```ts
export declare class CircularReference {
  constructor(readonly circularValue: unknown)
}
```

Added in v1.1.0

### \_tag (property)

**Signature**

```ts
readonly _tag: "CircularReference"
```

Added in v1.1.0

## ErrorAtIndex (class)

**Signature**

```ts
export declare class ErrorAtIndex {
  constructor(readonly index: number, readonly error: PrintError)
}
```

Added in v1.1.0

### \_tag (property)

**Signature**

```ts
readonly _tag: "ErrorAtIndex"
```

Added in v1.1.0

## ErrorAtKey (class)

**Signature**

```ts
export declare class ErrorAtKey {
  constructor(readonly key: string, readonly error: PrintError)
}
```

Added in v1.1.0

### \_tag (property)

**Signature**

```ts
readonly _tag: "ErrorAtKey"
```

Added in v1.1.0

## ErrorGroup (class)

**Signature**

```ts
export declare class ErrorGroup {
  constructor(readonly errors: RNEA.ReadonlyNonEmptyArray<PrintError>)
}
```

Added in v1.1.0

### \_tag (property)

**Signature**

```ts
readonly _tag: "ErrorGroup"
```

Added in v1.1.0

## InvalidValue (class)

**Signature**

```ts
export declare class InvalidValue {
  constructor(readonly value: unknown)
}
```

Added in v1.1.0

### \_tag (property)

**Signature**

```ts
readonly _tag: "InvalidValue"
```

Added in v1.1.0

## NamedError (class)

**Signature**

```ts
export declare class NamedError {
  constructor(readonly expected: string, readonly error: PrintError)
}
```

Added in v1.1.0

### \_tag (property)

**Signature**

```ts
readonly _tag: "NamedError"
```

Added in v1.1.0

# Guards

## isPrintError

**Signature**

```ts
export declare const isPrintError: (u: unknown) => u is PrintError
```

Added in v1.1.0

# Instances

## semigroupPrintingError

**Signature**

```ts
export declare const semigroupPrintingError: Sg.Semigroup<PrintError>
```

Added in v1.1.0

# Model

## PrintError (type alias)

**Signature**

```ts
export type PrintError = ErrorGroup | ErrorAtIndex | ErrorAtKey | NamedError | CircularReference | InvalidValue
```

Added in v1.1.0
