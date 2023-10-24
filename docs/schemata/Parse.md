---
title: Parse
nav_order: 66
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
export declare const Parse: <I, IO extends string = string>(
  inputName: string,
  parse: (raw: string) => Either<unknown, unknown>,
  print: (a: I) => Either<unknown, IO>,
  options?: ParserOptions | undefined
) => <O>(inner: Schema<I, O>) => Schema<IO, O>
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
