---
title: schemables/WithBrand/definition.ts
nav_order: 20
parent: Modules
---

## definition overview

Schemable for constructing a branded newtype

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [WithBrand1 (interface)](#withbrand1-interface)
  - [WithBrand2 (interface)](#withbrand2-interface)
  - [WithBrand2C (interface)](#withbrand2c-interface)
  - [WithBrandHKT2 (interface)](#withbrandhkt2-interface)

---

# Model

## WithBrand1 (interface)

**Signature**

```ts
export interface WithBrand1<S extends URIS> {
  /**
   * Schemable for constructing a branded newtype
   *
   * @since 1.0.0
   */
  readonly brand: <B>() => <A>(target: Kind<S, A>) => Kind<S, Branded<A, B>>
}
```

Added in v1.0.0

## WithBrand2 (interface)

**Signature**

```ts
export interface WithBrand2<S extends URIS2> {
  /**
   * Schemable for constructing a branded newtype
   *
   * @since 1.0.0
   */
  readonly brand: <B>() => <O, A>(target: Kind2<S, O, A>) => Kind2<S, O, Branded<A, B>>
}
```

Added in v1.0.0

## WithBrand2C (interface)

**Signature**

```ts
export interface WithBrand2C<S extends URIS2, E> {
  /**
   * Schemable for constructing a branded newtype
   *
   * @since 1.0.0
   */
  readonly brand: <B>() => <A>(target: Kind2<S, E, A>) => Kind2<S, E, Branded<A, B>>
}
```

Added in v1.0.0

## WithBrandHKT2 (interface)

**Signature**

```ts
export interface WithBrandHKT2<S> {
  /**
   * Schemable for constructing a branded newtype
   *
   * @since 1.0.0
   */
  readonly brand: <B>() => <O, A>(target: HKT2<S, O, A>) => HKT2<S, O, Branded<A, B>>
}
```

Added in v1.0.0
