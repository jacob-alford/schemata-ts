---
title: JsonDeserializer.ts
nav_order: 19
parent: Modules
---

## JsonDeserializer overview

Interprets a schema to parse a JSON string, and decode to a domain object.

Added in v1.1.0

---

<h2 class="text-delta">Table of contents</h2>

- [Guards](#guards)
  - [isParseError](#isparseerror)
- [Interpreters](#interpreters)
  - [getJsonDeserializer](#getjsondeserializer)
- [Model](#model)
  - [JsonDeserializer (interface)](#jsondeserializer-interface)
  - [ParseError (class)](#parseerror-class)
    - [\_tag (property)](#_tag-property)

---

# Guards

## isParseError

**Signature**

```ts
export declare const isParseError: (u: unknown) => u is ParseError
```

Added in v1.1.0

# Interpreters

## getJsonDeserializer

Interprets a schema to parse a JSON string, and decode to a domain object.

**Signature**

```ts
export declare const getJsonDeserializer: <E, A>(schema: SchemaExt<E, A>) => JsonDeserializer<A>
```

Added in v1.1.0

# Model

## JsonDeserializer (interface)

**Signature**

```ts
export interface JsonDeserializer<A> {
  readonly parse: (a: string) => E.Either<ParseError | DecodeError, A>
}
```

Added in v1.1.0

## ParseError (class)

**Signature**

```ts
export declare class ParseError {
  constructor(readonly error: unknown)
}
```

Added in v1.1.0

### \_tag (property)

**Signature**

```ts
readonly _tag: "ParseError"
```

Added in v1.1.0
