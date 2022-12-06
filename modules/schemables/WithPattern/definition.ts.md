---
title: schemables/WithPattern/definition.ts
nav_order: 114
parent: Modules
---

## definition overview

Schemable construction based on Regex combinators

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [WithPattern1 (interface)](#withpattern1-interface)
  - [WithPattern2 (interface)](#withpattern2-interface)
  - [WithPattern2C (interface)](#withpattern2c-interface)
  - [WithPatternHKT2 (interface)](#withpatternhkt2-interface)

---

# Model

## WithPattern1 (interface)

**Signature**

```ts
export interface WithPattern1<S extends URIS> {
  /**
   * Schemable construction based on Regex combinators
   *
   * @since 1.0.0
   */
  readonly pattern: (pattern: Pattern, description: string, caseInsensitive?: boolean) => Kind<S, string>
}
```

Added in v1.0.0

## WithPattern2 (interface)

**Signature**

```ts
export interface WithPattern2<S extends URIS2> {
  /**
   * Schemable construction based on Regex combinators
   *
   * @since 1.0.0
   */
  readonly pattern: (pattern: Pattern, description: string, caseInsensitive?: boolean) => Kind2<S, string, string>
}
```

Added in v1.0.0

## WithPattern2C (interface)

**Signature**

```ts
export interface WithPattern2C<S extends URIS2, E> {
  /**
   * Schemable construction based on Regex combinators
   *
   * @since 1.0.0
   */
  readonly pattern: (pattern: Pattern, description: string, caseInsensitive?: boolean) => Kind2<S, E, string>
}
```

Added in v1.0.0

## WithPatternHKT2 (interface)

**Signature**

```ts
export interface WithPatternHKT2<S> {
  /**
   * Schemable construction based on Regex combinators
   *
   * @since 1.0.0
   */
  readonly pattern: (pattern: Pattern, description: string, caseInsensitive?: boolean) => HKT2<S, string, string>
}
```

Added in v1.0.0
