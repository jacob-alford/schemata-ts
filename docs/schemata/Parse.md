---
title: Parse
nav_order: 63
parent: schemata
---

## Parse overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Combinators](#combinators)
  - [Parse](#parse)
- [utils](#utils)
  - [ParserOptions (type alias)](#parseroptions-type-alias)

---

# Combinators

## Parse

A schema for pre-parsing/printing a string

**Signature**

```ts
export declare const Parse: <I>(
  name: string,
  parse: (raw: string) => E.Either<unknown, unknown>,
  print: (a: I) => E.Either<unknown, string>,
  options?: ParserOptions | undefined
) => <O>(inner: Schema<I, O>) => Schema<string, O>
```

Added in v2.0.0

# utils

## ParserOptions (type alias)

**Signature**

```ts
export type ParserOptions = {
  readonly contentEncoding?: string
  readonly contentMediaType?: string
  readonly format?: string
}
```

Added in v2.0.0
