import it from 'ava'
import { WeeSchema, weeschema } from '..'

interface WeirdObject {
  foo: string,
  bar: object | number
}

const schema : WeeSchema<WeirdObject> = weeschema<WeirdObject>({
  'foo': ['string'],
  'bar': ['object', 'number']
})

it('doesnt throw if the schema matches', (t) => {
  t.notThrows(() => {
    schema.assert({
      'foo': 'hi',
      'bar': 1
    })
  })

  let a = 1 as unknown

  t.notThrows(() => {
    schema.assert({
      'foo': 'hi',
      'bar': { some: 'object' }
    })
  })
})

it('throws if a property has a wrong type', (t) => {
  t.throws(() => {
    schema.assert({
      'foo': 'hi',
      'bar': undefined
    })
  })
})

it('throws if a property is missing', (t) => {
  t.throws(() => {
    schema.assert({
      'foo': 'hi'
    })
  })
})

it('throws if an extra property is present', (t) => {
  t.throws(() => {
    schema.assert({
      'foo': 'hi',
      'bar': 1,
      'hi': 'hello'
    })
  })
})

