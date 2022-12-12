---
title: schemables/WithOption/definition.ts
nav_order: 96
parent: Modules
---

## definition overview

Represents an exclusion of a supplied value where the exclusion is mapped to `None`.
Requires an inner schemable, and an Eq instance which defaults to strict equality.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [WithOption1 (interface)](#withoption1-interface)
  - [WithOption2 (interface)](#withoption2-interface)
  - [WithOption2C (interface)](#withoption2c-interface)
  - [WithOptionHKT2 (interface)](#withoptionhkt2-interface)

---

# Model

## WithOption1 (interface)

**Signature**

```ts
export interface WithOption1<S extends URIS> {
  /**
   * Represents an exclusion of a supplied value where the exclusion is mapped to `None`. Requires an inner schemable,
   * guard, and Eq instance which defaults to strict equality.
   *
   * @since 1.0.0
   * @category Model
   */
  readonly optionFromExclude: <A, B extends A>(exclude: B, sa: Kind<S, A>, eqA?: Eq_.Eq<A>) => Kind<S, O.Option<A>>
}
```

Added in v1.0.0

## WithOption2 (interface)

**Signature**

```ts
export interface WithOption2<S extends URIS2> {
  /**
   * Represents an exclusion of a supplied value where the exclusion is mapped to `None`. Requires an inner schemable,
   * guard, and Eq instance which defaults to strict equality.
   *
   * @since 1.0.0
   * @category Model
   */
  readonly optionFromExclude: <A, B extends A, E>(
    exclude: B,
    sa: Kind2<S, E, A>,
    eqA?: Eq_.Eq<A>
  ) => Kind2<S, E | B, O.Option<A>>
}
```

Added in v1.0.0

## WithOption2C (interface)

**Signature**

```ts
export interface WithOption2C<S extends URIS2, E> {
  /**
   * Represents an exclusion of a supplied value where the exclusion is mapped to `None`. Requires an inner schemable,
   * guard, and Eq instance which defaults to strict equality.
   *
   * @since 1.0.0
   * @category Model
   */
  readonly optionFromExclude: <A, B extends A>(
    exclude: B,
    sa: Kind2<S, E, A>,
    eqA?: Eq_.Eq<A>
  ) => Kind2<S, E, O.Option<A>>
}
```

Added in v1.0.0

## WithOptionHKT2 (interface)

**Signature**

```ts
export interface WithOptionHKT2<S> {
  /**
   * Represents an exclusion of a supplied value where the exclusion is mapped to `None`. Requires an inner schemable,
   * guard, and Eq instance which defaults to strict equality.
   *
   * @since 1.0.0
   * @category Model
   */
  readonly optionFromExclude: <A, B extends A, E>(
    exclude: B,
    sa: HKT2<S, E, A>,
    eqA?: Eq_.Eq<A>
  ) => HKT2<S, E | B, O.Option<A>>
}
```

Added in v1.0.0
