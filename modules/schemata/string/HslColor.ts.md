---
title: schemata/string/HslColor.ts
nav_order: 63
parent: Modules
---

## HslColor overview

An HSL string. Commonly in CSS.

**Example**

```ts
import { HslColor } from 'schemata-ts/schemata/string/HslColor'
import { getGuard } from 'schemata-ts/Guard'

const hue = 270
const saturation = 60
const lightness = 70
const alpha = 0.7

const hslString = `hsl(${hue} ${saturation}% ${lightness}% / ${alpha})`
const Guard = getGuard(HslColor)

assert.equal(Guard.is(hslString), true)
```

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [HslColorS (type alias)](#hslcolors-type-alias)
- [Pattern](#pattern)
  - [HslPattern](#hslpattern)
- [Schema](#schema)
  - [HslColor](#hslcolor)
- [utils](#utils)
  - [HslColor (type alias)](#hslcolor-type-alias)

---

# Model

## HslColorS (type alias)

**Signature**

```ts
export type HslColorS = SchemaExt<string, HslColor>
```

Added in v1.0.0

# Pattern

## HslPattern

**Signature**

```ts
export declare const HslPattern: PB.TermSequence
```

Added in v1.0.0

# Schema

## HslColor

**Signature**

```ts
export declare const HslColor: HslColorS
```

Added in v1.0.0

# utils

## HslColor (type alias)

An HSL string. Commonly in CSS.

**Signature**

```ts
export type HslColor = Branded<string, HslColorBrand>
```

**Example**

```ts
import { HslColor } from 'schemata-ts/schemata/string/HslColor'
import { getGuard } from 'schemata-ts/Guard'

const hue = 270
const saturation = 60
const lightness = 70
const alpha = 0.7

const hslString = `hsl(${hue} ${saturation}% ${lightness}% / ${alpha})`
const Guard = getGuard(HslColor)

assert.equal(Guard.is(hslString), true)
```

Added in v1.0.0
