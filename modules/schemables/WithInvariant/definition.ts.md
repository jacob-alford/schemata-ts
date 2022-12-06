---
title: schemables/WithInvariant/definition.ts
nav_order: 68
parent: Modules
---

## definition overview

Invariant mapping for schemable

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [WithInvariant1 (interface)](#withinvariant1-interface)
  - [WithInvariant2 (interface)](#withinvariant2-interface)
  - [WithInvariant2C (interface)](#withinvariant2c-interface)
  - [WithInvariantHKT2 (interface)](#withinvarianthkt2-interface)

---

# Model

## WithInvariant1 (interface)

**Signature**

```ts
export interface WithInvariant1<S extends URIS> {
  /**
   * Invariant mapping for schemable
   *
   * @since 1.0.0
   */
  readonly imap: <B>(
    guardB: G.Guard<unknown, B>,
    name: string
  ) => <A>(f: (a: A) => B, g: (b: B) => A) => (target: Kind<S, A>) => Kind<S, B>
}
```

Added in v1.0.0

## WithInvariant2 (interface)

**Signature**

```ts
export interface WithInvariant2<S extends URIS2> {
  /**
   * Invariant mapping for schemable
   *
   * @since 1.0.0
   */
  readonly imap: <B>(
    guardB: G.Guard<unknown, B>,
    name: string
  ) => <A>(f: (a: A) => B, g: (b: B) => A) => <O>(target: Kind2<S, O, A>) => Kind2<S, O, B>
}
```

Added in v1.0.0

## WithInvariant2C (interface)

**Signature**

```ts
export interface WithInvariant2C<S extends URIS2, E> {
  /**
   * Invariant mapping for schemable
   *
   * @since 1.0.0
   */
  readonly imap: <B>(
    guardB: G.Guard<unknown, B>,
    name: string
  ) => <A>(f: (a: A) => B, g: (b: B) => A) => (target: Kind2<S, E, A>) => Kind2<S, E, B>
}
```

Added in v1.0.0

## WithInvariantHKT2 (interface)

**Signature**

```ts
export interface WithInvariantHKT2<S> {
  /**
   * Invariant mapping for schemable
   *
   * @since 1.0.0
   */
  readonly imap: <B>(
    guardB: G.Guard<unknown, B>,
    name: string
  ) => <A>(f: (a: A) => B, g: (b: B) => A) => <O>(target: HKT2<S, O, A>) => HKT2<S, O, B>
}
```

Added in v1.0.0
