import it         from 'ava'
import weeschema  from '..'

const { ok } = weeschema({
  'foo': ['string'],
  'bar': ['object', 'number']
})

it('returns true if the schema matches', (t) => {
  t.true(ok({
    'foo': 'hi',
    'bar': 1
  }))

  t.true(ok({
    'foo': 'hi',
    'bar': { some: 'object' }
  }))
})

it('returns false if a property has a wrong type', (t) => {
  t.false(ok({
    'foo': 'hi',
    'bar': undefined
  }))
})

it('returns false if a property is missing', (t) => {
  t.false(ok({
    'foo': 'hi'
  }))
})

it('returns false if an extra property is present', (t) => {
  t.false(ok({
    'foo': 'hi',
    'bar': 1,
    'hi': 'hello'
  }))
})

