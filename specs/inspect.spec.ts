import it         from 'ava'
import weeschema  from '..'

const { inspect } = weeschema({
  'foo': ['string'],
  'bar': ['object', 'number']
})

it('returns an empty array if the schema matches', (t) => {
  t.deepEqual(inspect({
    'foo': 'hi',
    'bar': 1
  }), [])

  t.deepEqual(inspect({
    'foo': 'hi',
    'bar': { some: 'object' }
  }), [])
})

it('returns errors if a property has a wrong type', (t) => {
  t.deepEqual(inspect({
    'foo': 'hi',
    'bar': undefined
  }), ['Invalid type for key \'bar\''])
})

it('returns errors if a property is missing', (t) => {
  t.deepEqual(inspect({
    'foo': 'hi'
  }), ['Missing key \'bar\''])
})

it('returns false if an extra property is present', (t) => {
  t.deepEqual(inspect({
    'foo': 'hi',
    'bar': 1,
    'hi': 'hello'
  }), ["Invalid key 'hi'"])
})

