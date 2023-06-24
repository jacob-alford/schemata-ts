---
title: SchemableExt.ts
nav_order: 28
parent: Modules
---

## SchemableExt overview

The extended Schemable typeclass

**Warning: DO NOT EDIT, this module is autogenerated**

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Instances](#instances)
  - [SchemableExt (interface)](#schemableext-interface)
  - [SchemableExt1 (interface)](#schemableext1-interface)
  - [SchemableExt2 (interface)](#schemableext2-interface)
  - [SchemableExt2C (interface)](#schemableext2c-interface)

---

# Instances

## SchemableExt (interface)

**Signature**

```ts
export interface SchemableExt<S>
  extends SchemableHKT2<S>,
    WithAnnotateHKT2<S>,
    WithBrandHKT2<S>,
    WithCheckDigitHKT2<S>,
    WithDateHKT2<S>,
    WithFloatHKT2<S>,
    WithIntHKT2<S>,
    WithInvariantHKT2<S>,
    WithJsonHKT2<S>,
    WithMapHKT2<S>,
    WithOptionHKT2<S>,
    WithOptionalHKT2<S>,
    WithPaddingHKT2<S>,
    WithPatternHKT2<S>,
    WithRefineHKT2<S>,
    WithStructMHKT2<S>,
    WithUnknownHKT2<S>,
    WithUnknownContainersHKT2<S> {}
```

Added in v1.0.0

## SchemableExt1 (interface)

**Signature**

```ts
export interface SchemableExt1<S extends URIS>
  extends Schemable1<S>,
    WithAnnotate1<S>,
    WithBrand1<S>,
    WithCheckDigit1<S>,
    WithDate1<S>,
    WithFloat1<S>,
    WithInt1<S>,
    WithInvariant1<S>,
    WithJson1<S>,
    WithMap1<S>,
    WithOption1<S>,
    WithOptional1<S>,
    WithPadding1<S>,
    WithPattern1<S>,
    WithRefine1<S>,
    WithStructM1<S>,
    WithUnknown1<S>,
    WithUnknownContainers1<S> {}
```

Added in v1.0.0

## SchemableExt2 (interface)

**Signature**

```ts
export interface SchemableExt2<S extends URIS2>
  extends Schemable2<S>,
    WithAnnotate2<S>,
    WithBrand2<S>,
    WithCheckDigit2<S>,
    WithDate2<S>,
    WithFloat2<S>,
    WithInt2<S>,
    WithInvariant2<S>,
    WithJson2<S>,
    WithMap2<S>,
    WithOption2<S>,
    WithOptional2<S>,
    WithPadding2<S>,
    WithPattern2<S>,
    WithRefine2<S>,
    WithStructM2<S>,
    WithUnknown2<S>,
    WithUnknownContainers2<S> {}
```

Added in v1.0.0

## SchemableExt2C (interface)

**Signature**

```ts
export interface SchemableExt2C<S extends URIS2>
  extends Schemable2C<S, unknown>,
    WithAnnotate2C<S, unknown>,
    WithBrand2C<S, unknown>,
    WithCheckDigit2C<S, unknown>,
    WithDate2C<S, unknown>,
    WithFloat2C<S, unknown>,
    WithInt2C<S, unknown>,
    WithInvariant2C<S, unknown>,
    WithJson2C<S, unknown>,
    WithMap2C<S, unknown>,
    WithOption2C<S, unknown>,
    WithOptional2C<S, unknown>,
    WithPadding2C<S, unknown>,
    WithPattern2C<S, unknown>,
    WithRefine2C<S, unknown>,
    WithStructM2C<S, unknown>,
    WithUnknown2C<S, unknown>,
    WithUnknownContainers2C<S, unknown> {}
```

Added in v1.0.0