# Wee Schema

![](https://github.com/patrixr/wee-schema/workflows/Test%20and%20Publish/badge.svg)

Miniature schema validator for Typescript (with type guards)


## Usage

```typescript
import { weeschema, WeeSchema } from 'wee-schema'

interface MyType {
  foo: string
  bar: number | string
}

// === Create the schema

const schema : WeeSchema<MyType> = weeschema<MyType>({
  'foo': ['string'],
  'bar': ['number', 'string']
})

// === Use the schema

function receive(thing: unknown) {

  thing.foo // ❌ generates a TS error

  // --- Using a type guard

  if (schema.ok(thing)) {
    console.log(thing.foo); // ✅ compiles + intellisense
  }


  schema.assert(thing);

  console.log(thing.foo); // ✅ compiles + intellisense
}

```

## Schema methods

- `ok` Returns true if the object is of the correct type
- `assert` Throws an error if the object is not of the right type
- `inspect` Returns a list of error messages (if any)

