---
title: schemables/WithDate/definition.ts
nav_order: 39
parent: Modules
---

## definition overview

Represents valid Date objects, and valid date-strings parsable by `Date.parse`

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [WithDate1 (interface)](#withdate1-interface)
  - [WithDate2 (interface)](#withdate2-interface)
  - [WithDate2C (interface)](#withdate2c-interface)
  - [WithDateHKT2 (interface)](#withdatehkt2-interface)

---

# Model

## WithDate1 (interface)

**Signature**

```ts
export interface WithDate1<S extends URIS> {
  /**
   * Represents valid Date objects
   *
   * @since 1.0.0
   */
  date: Kind<S, Date>

  /**
   * Represents valid date-strings that can be parsed by `Date.parse` and converted into valid date objects
   *
   * @since 1.0.0
   */
  dateFromString: Kind<S, Date>
}
```

Added in v1.0.0

## WithDate2 (interface)

**Signature**

```ts
export interface WithDate2<S extends URIS2> {
  /**
   * Represents valid Date objects
   *
   * @since 1.0.0
   */
  date: Kind2<S, Date, Date>

  /**
   * Represents valid date-strings that can be parsed by `Date.parse` and converted into valid date objects
   *
   * @since 1.0.0
   */
  dateFromString: Kind2<S, string, Date>
}
```

Added in v1.0.0

## WithDate2C (interface)

**Signature**

```ts
export interface WithDate2C<S extends URIS2, E> {
  /**
   * Represents valid Date objects
   *
   * @since 1.0.0
   */
  date: Kind2<S, E, Date>
  /**
   * Represents valid date-strings that can be parsed by `Date.parse` and converted into valid date objects
   *
   * @since 1.0.0
   */
  dateFromString: Kind2<S, E, Date>
}
```

Added in v1.0.0

## WithDateHKT2 (interface)

**Signature**

```ts
export interface WithDateHKT2<S> {
  /**
   * Represents valid Date objects
   *
   * @since 1.0.0
   */
  date: HKT2<S, Date, Date>

  /**
   * Represents valid date-strings that can be parsed by `Date.parse` and converted into valid date objects
   *
   * @since 1.0.0
   */
  dateFromString: HKT2<S, string, Date>
}
```

Added in v1.0.0
