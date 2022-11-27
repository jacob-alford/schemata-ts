---
title: schemables/WithFloat/definition.ts
nav_order: 47
parent: Modules
---

## definition overview

Floating point branded newtype. Parameters: min, max are inclusive.

Represents floating point numbers:

```math
 { f | f ∈ ℝ, f >= -Number.MAX_VALUE, f <= Number.MAX_VALUE }
```

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [Float (type alias)](#float-type-alias)
  - [FloatParams (type alias)](#floatparams-type-alias)
  - [WithFloat1 (interface)](#withfloat1-interface)
  - [WithFloat2 (interface)](#withfloat2-interface)
  - [WithFloat2C (interface)](#withfloat2c-interface)
  - [WithFloatHKT2 (interface)](#withfloathkt2-interface)

---

# Model

## Float (type alias)

Floating point branded newtype. Parameters: min, max are inclusive.

Represents floating point numbers:

```math
 { f | f ∈ ℝ, f >= -Number.MAX_VALUE, f <= Number.MAX_VALUE }
```

**Signature**

```ts
export type Float = Branded<number, FloatBrand>
```

Added in v1.0.0

## FloatParams (type alias)

**Signature**

```ts
export type FloatParams = {
  readonly min?: number
  readonly max?: number
}
```

Added in v1.0.0

## WithFloat1 (interface)

**Signature**

````ts
export interface WithFloat1<S extends URIS> {
  /**
   * Floating point branded newtype. Parameters: min, max are inclusive.
   *
   * Represents floating point numbers:
   *
   * ```math
   *  { f | f ∈ ℝ, f >= -Number.MAX_VALUE, f <= Number.MAX_VALUE }
   * ```
   *
   * @since 1.0.0
   */
  float: (params?: FloatParams) => Kind<S, Float>
}
````

Added in v1.0.0

## WithFloat2 (interface)

**Signature**

````ts
export interface WithFloat2<S extends URIS2> {
  /**
   * Floating point branded newtype. Parameters: min, max are inclusive.
   *
   * Represents floating point numbers:
   *
   * ```math
   *  { f | f ∈ ℝ, f >= -Number.MAX_VALUE, f <= Number.MAX_VALUE }
   * ```
   *
   * @since 1.0.0
   */
  float: (params?: FloatParams) => Kind2<S, number, Float>
}
````

Added in v1.0.0

## WithFloat2C (interface)

**Signature**

````ts
export interface WithFloat2C<S extends URIS2, E> {
  /**
   * Floating point branded newtype. Parameters: min, max are inclusive.
   *
   * Represents floating point numbers:
   *
   * ```math
   *  { f | f ∈ ℝ, f >= -Number.MAX_VALUE, f <= Number.MAX_VALUE }
   * ```
   *
   * @since 1.0.0
   */
  float: (params?: FloatParams) => Kind2<S, E, Float>
}
````

Added in v1.0.0

## WithFloatHKT2 (interface)

**Signature**

````ts
export interface WithFloatHKT2<S> {
  /**
   * Floating point branded newtype. Parameters: min, max are inclusive.
   *
   * Represents floating point numbers:
   *
   * ```math
   *  { f | f ∈ ℝ, f >= -Number.MAX_VALUE, f <= Number.MAX_VALUE }
   * ```
   *
   * @since 1.0.0
   */
  float: (params?: FloatParams) => HKT2<S, number, Float>
}
````

Added in v1.0.0
