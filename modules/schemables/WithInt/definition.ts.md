---
title: schemables/WithInt/definition.ts
nav_order: 57
parent: Modules
---

## definition overview

Integer branded newtype. Parameters: min, max are inclusive.

Represents integers:

```math
 { z | z ∈ ℤ, z >= -2 ** 53 + 1, z <= 2 ** 53 - 1 }
```

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [Int (type alias)](#int-type-alias)
  - [IntParams (type alias)](#intparams-type-alias)
  - [WithInt1 (interface)](#withint1-interface)
  - [WithInt2 (interface)](#withint2-interface)
  - [WithInt2C (interface)](#withint2c-interface)
  - [WithIntHKT2 (interface)](#withinthkt2-interface)

---

# Model

## Int (type alias)

Integer branded newtype. Parameters: min, max are inclusive.

Represents integers:

```math
 { z | z ∈ ℤ, z >= -2 ** 53 + 1, z <= 2 ** 53 - 1 }
```

**Signature**

```ts
export type Int = Branded<number, IntBrand>
```

Added in v1.0.0

## IntParams (type alias)

**Signature**

```ts
export type IntParams = {
  readonly min?: number
  readonly max?: number
}
```

Added in v1.0.0

## WithInt1 (interface)

**Signature**

````ts
export interface WithInt1<S extends URIS> {
  /**
   * Integer branded newtype. Parameters: min, max are inclusive.
   *
   * Represents integers:
   *
   * ```math
   *  { z | z ∈ ℤ, z >= -2 ** 53 + 1, z <= 2 ** 53 - 1 }
   * ```
   *
   * @since 1.0.0
   * @category Model
   */
  int: (params?: IntParams) => Kind<S, Int>
}
````

Added in v1.0.0

## WithInt2 (interface)

**Signature**

````ts
export interface WithInt2<S extends URIS2> {
  /**
   * Integer branded newtype. Parameters: min, max are inclusive.
   *
   * Represents integers:
   *
   * ```math
   *  { z | z ∈ ℤ, z >= -2 ** 53 + 1, z <= 2 ** 53 - 1 }
   * ```
   *
   * @since 1.0.0
   * @category Model
   */
  int: (params?: IntParams) => Kind2<S, number, Int>
}
````

Added in v1.0.0

## WithInt2C (interface)

**Signature**

````ts
export interface WithInt2C<S extends URIS2, E> {
  /**
   * Integer branded newtype. Parameters: min, max are inclusive.
   *
   * Represents integers:
   *
   * ```math
   *  { z | z ∈ ℤ, z >= -2 ** 53 + 1, z <= 2 ** 53 - 1 }
   * ```
   *
   * @since 1.0.0
   * @category Model
   */
  int: (params?: IntParams) => Kind2<S, E, Int>
}
````

Added in v1.0.0

## WithIntHKT2 (interface)

**Signature**

````ts
export interface WithIntHKT2<S> {
  /**
   * Integer branded newtype. Parameters: min, max are inclusive.
   *
   * Represents integers:
   *
   * ```math
   *  { z | z ∈ ℤ, z >= -2 ** 53 + 1, z <= 2 ** 53 - 1 }
   * ```
   *
   * @since 1.0.0
   * @category Model
   */
  int: (params?: IntParams) => HKT2<S, number, Int>
}
````

Added in v1.0.0
