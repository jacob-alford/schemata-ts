---
title: schemables/WithMap/definition.ts
nav_order: 87
parent: Modules
---

## definition overview

Represents a ReadonlyMap converted from an expected array of entries.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [WithMap1 (interface)](#withmap1-interface)
  - [WithMap2 (interface)](#withmap2-interface)
  - [WithMap2C (interface)](#withmap2c-interface)
  - [WithMapHKT2 (interface)](#withmaphkt2-interface)

---

# Model

## WithMap1 (interface)

**Signature**

```ts
export interface WithMap1<S extends URIS> {
  /**
   * Represents a ReadonlyMap converted from an expected array of entries.
   *
   * @since 1.0.0
   * @category Model
   */
  readonly mapFromEntries: <K, A>(ordK: Ord.Ord<K>, sk: Kind<S, K>, sa: Kind<S, A>) => Kind<S, ReadonlyMap<K, A>>
}
```

Added in v1.0.0

## WithMap2 (interface)

**Signature**

```ts
export interface WithMap2<S extends URIS2> {
  /**
   * Represents a ReadonlyMap converted from an expected array of entries.
   *
   * @since 1.0.0
   * @category Model
   */
  readonly mapFromEntries: <EK, EA, K extends EK, A extends EA>(
    ordEK: Ord.Ord<K>,
    sk: Kind2<S, EK, K>,
    sa: Kind2<S, EA, A>
  ) => Kind2<S, ReadonlyArray<readonly [EK, EA]>, ReadonlyMap<K, A>>
}
```

Added in v1.0.0

## WithMap2C (interface)

**Signature**

```ts
export interface WithMap2C<S extends URIS2, E> {
  /**
   * Represents a ReadonlyMap converted from an expected array of entries.
   *
   * @since 1.0.0
   * @category Model
   */
  readonly mapFromEntries: <K, A>(
    ordK: Ord.Ord<K>,
    sk: Kind2<S, E, K>,
    sa: Kind2<S, E, A>
  ) => Kind2<S, E, ReadonlyMap<K, A>>
}
```

Added in v1.0.0

## WithMapHKT2 (interface)

**Signature**

```ts
export interface WithMapHKT2<S> {
  /**
   * Represents a ReadonlyMap converted from an expected array of entries.
   *
   * @since 1.0.0
   * @category Model
   */
  readonly mapFromEntries: <EK, EA, K extends EK, A extends EA>(
    ordEK: Ord.Ord<K>,
    sk: HKT2<S, EK, K>,
    sa: HKT2<S, EA, A>
  ) => HKT2<S, ReadonlyArray<readonly [K, A]>, ReadonlyMap<K, A>>
}
```

Added in v1.0.0
