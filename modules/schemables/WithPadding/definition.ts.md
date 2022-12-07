---
title: schemables/WithPadding/definition.ts
nav_order: 105
parent: Modules
---

## definition overview

Adds a character to the right or left of a string until it reaches a certain length.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [PaddingLength (type alias)](#paddinglength-type-alias)
  - [WithPadding1 (interface)](#withpadding1-interface)
  - [WithPadding2 (interface)](#withpadding2-interface)
  - [WithPadding2C (interface)](#withpadding2c-interface)
  - [WithPaddingHKT2 (interface)](#withpaddinghkt2-interface)

---

# Model

## PaddingLength (type alias)

**Signature**

```ts
export type PaddingLength =
  | { readonly by: 'MaxLength'; readonly maxLength: number | ((s: string) => number) }
  | {
      readonly by: 'ExactLength'
      readonly exactLength: number | ((s: string) => number)
    }
```

Added in v1.0.0

## WithPadding1 (interface)

**Signature**

```ts
export interface WithPadding1<S extends URIS> {
  /**
   * Adds a character to the left of a string until it reaches a certain length.
   *
   * @since 1.0.0
   */
  readonly padLeft: (length: PaddingLength, char: string) => (sa: Kind<S, string>) => Kind<S, string>

  /**
   * Adds a character to the right of a string until it reaches a certain length.
   *
   * @since 1.0.0
   */
  readonly padRight: (length: PaddingLength, char: string) => (sa: Kind<S, string>) => Kind<S, string>
}
```

Added in v1.0.0

## WithPadding2 (interface)

**Signature**

```ts
export interface WithPadding2<S extends URIS2> {
  /**
   * Adds a character to the left of a string until it reaches a certain length.
   *
   * @since 1.0.0
   */
  readonly padLeft: (length: PaddingLength, char: string) => (sa: Kind2<S, string, string>) => Kind2<S, string, string>

  /**
   * Adds a character to the right of a string until it reaches a certain length.
   *
   * @since 1.0.0
   */
  readonly padRight: (length: PaddingLength, char: string) => (sa: Kind2<S, string, string>) => Kind2<S, string, string>
}
```

Added in v1.0.0

## WithPadding2C (interface)

**Signature**

```ts
export interface WithPadding2C<S extends URIS2, E> {
  /**
   * Adds a character to the left of a string until it reaches a certain length.
   *
   * @since 1.0.0
   */
  readonly padLeft: (length: PaddingLength, char: string) => (sa: Kind2<S, E, string>) => Kind2<S, E, string>
  /**
   * Adds a character to the right of a string until it reaches a certain length.
   *
   * @since 1.0.0
   */
  readonly padRight: (length: PaddingLength, char: string) => (sa: Kind2<S, E, string>) => Kind2<S, E, string>
}
```

Added in v1.0.0

## WithPaddingHKT2 (interface)

**Signature**

```ts
export interface WithPaddingHKT2<S> {
  /**
   * Adds a character to the left of a string until it reaches a certain length.
   *
   * @since 1.0.0
   */
  readonly padLeft: (length: PaddingLength, char: string) => (sa: HKT2<S, string, string>) => HKT2<S, string, string>

  /**
   * Adds a character to the right of a string until it reaches a certain length.
   *
   * @since 1.0.0
   */
  readonly padRight: (length: PaddingLength, char: string) => (sa: HKT2<S, string, string>) => HKT2<S, string, string>
}
```

Added in v1.0.0
