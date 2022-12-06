---
title: schemables/WithCheckDigit/definition.ts
nav_order: 28
parent: Modules
---

## definition overview

Schemable for constructing a string with a check digit (e.g. ISBN or Credit Card)

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [WithCheckDigit1 (interface)](#withcheckdigit1-interface)
  - [WithCheckDigit2 (interface)](#withcheckdigit2-interface)
  - [WithCheckDigit2C (interface)](#withcheckdigit2c-interface)
  - [WithCheckDigitHKT2 (interface)](#withcheckdigithkt2-interface)
- [utils](#utils)
  - [CheckDigitVerified (interface)](#checkdigitverified-interface)

---

# Model

## WithCheckDigit1 (interface)

**Signature**

```ts
export interface WithCheckDigit1<S extends URIS> {
  readonly checkDigit: (
    algorithm: (s: string) => string,
    location: number | ((s: string) => number)
  ) => (target: Kind<S, string>) => Kind<S, Branded<string, CheckDigitVerified>>
}
```

Added in v1.0.0

## WithCheckDigit2 (interface)

**Signature**

```ts
export interface WithCheckDigit2<S extends URIS2> {
  readonly checkDigit: (
    algorithm: (s: string) => string,
    location: number | ((s: string) => number)
  ) => <O>(target: Kind2<S, O, string>) => Kind2<S, O, Branded<string, CheckDigitVerified>>
}
```

Added in v1.0.0

## WithCheckDigit2C (interface)

**Signature**

```ts
export interface WithCheckDigit2C<S extends URIS2, E> {
  readonly checkDigit: (
    algorithm: (s: string) => string,
    location: number | ((s: string) => number)
  ) => (target: Kind2<S, E, string>) => Kind2<S, E, Branded<string, CheckDigitVerified>>
}
```

Added in v1.0.0

## WithCheckDigitHKT2 (interface)

**Signature**

```ts
export interface WithCheckDigitHKT2<S> {
  readonly checkDigit: (
    algorithm: (s: string) => string,
    location: number | ((s: string) => number)
  ) => <O>(target: HKT2<S, O, string>) => HKT2<S, O, Branded<string, CheckDigitVerified>>
}
```

Added in v1.0.0

# utils

## CheckDigitVerified (interface)

**Signature**

```ts
export interface CheckDigitVerified {
  readonly CheckDigitVerified: unique symbol
}
```

Added in v1.0.0
