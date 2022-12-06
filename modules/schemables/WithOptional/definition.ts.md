---
title: schemables/WithOptional/definition.ts
nav_order: 95
parent: Modules
---

## definition overview

Schemable for widening a type to include undefined. Similar to nullable but for undefined.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [WithOptional1 (interface)](#withoptional1-interface)
  - [WithOptional2 (interface)](#withoptional2-interface)
  - [WithOptional2C (interface)](#withoptional2c-interface)
  - [WithOptionalHKT2 (interface)](#withoptionalhkt2-interface)

---

# Model

## WithOptional1 (interface)

**Signature**

```ts
export interface WithOptional1<S extends URIS> {
  /**
   * Schemable for widening a type to include undefined. Similar to nullable but for undefined.
   *
   * @since 1.0.0
   */
  readonly optional: <A>(target: Kind<S, A>) => Kind<S, A | undefined>
}
```

Added in v1.0.0

## WithOptional2 (interface)

**Signature**

```ts
export interface WithOptional2<S extends URIS2> {
  /**
   * Schemable for widening a type to include undefined. Similar to nullable but for undefined.
   *
   * @since 1.0.0
   */
  readonly optional: <O, A>(target: Kind2<S, O, A>) => Kind2<S, O | undefined, A | undefined>
}
```

Added in v1.0.0

## WithOptional2C (interface)

**Signature**

```ts
export interface WithOptional2C<S extends URIS2, E> {
  /**
   * Schemable for widening a type to include undefined. Similar to nullable but for undefined.
   *
   * @since 1.0.0
   */
  readonly optional: <A>(target: Kind2<S, E, A>) => Kind2<S, E, A | undefined>
}
```

Added in v1.0.0

## WithOptionalHKT2 (interface)

**Signature**

```ts
export interface WithOptionalHKT2<S> {
  /**
   * Schemable for widening a type to include undefined. Similar to nullable but for undefined.
   *
   * @since 1.0.0
   */
  readonly optional: <O, A>(target: HKT2<S, O, A>) => HKT2<S, O | undefined, A | undefined>
}
```

Added in v1.0.0
