const qg = require('./queryGenerator')

describe('QueryGenerator.select', () => {

  it('returns a function', () => {
    expect(typeof(qg.select('bird'))).toBe('function')
  })

})

describe('QueryGenerator.select(table)', () => {

  it('generates a proper simple query', () => {
    const result = qg.select('duck')()
    const expected = 'SELECT * FROM duck'
    expect(result).toBe(expected)
  })

  it('generates a query with capitalized given fields', () => {
    const result = qg.select('duck')({
      fields: ['tales', 'McMansion'],
    })
    const expected = 'SELECT TALES, MCMANSION FROM duck'
    expect(result).toBe(expected)
  })

  it('generates a query with one given condition', () => {
    const result = qg.select('duck')({
      where: [['size', '>', 3]],
    })
    const expected = 'SELECT * FROM duck WHERE SIZE > 3'
    expect(result).toBe(expected)
  })

  it('generates a query with multiple conditions', () => {
    const result = qg.select('duck')({
      where: [['size', '>', 3], 'and', ['size', '<=', 5]],
    })
    const expected = 'SELECT * FROM duck WHERE SIZE > 3 AND SIZE <= 5'
    expect(result).toBe(expected)
  })

  it('generates a query given both fields and conditions', () => {
    const result = qg.select('duck')({
      fields: ['tales', 'and', 'ponytails'],
      where: [['size', '>', 3]],
    })
    const expected = 'SELECT TALES, AND, PONYTAILS FROM duck WHERE SIZE > 3'
    expect(result).toBe(expected)
  })

  it('generates a join with another table', () => {
    const result = qg.select('duck')({
      join:[{ table: 'goose', on: [['duck.id', '=', 'goose.id']]}]
    })
    const expected = 'SELECT * FROM duck INNER JOIN goose ON duck.ID = goose.ID'
    expect(result).toBe(expected)
  })

})

describe('QueryGenerator.insert', () => {

  it('returns a function', () => {
    expect(typeof(qg.insert('duck'))).toBe('function')
  })

})

describe('QueryGenerator.insert(table)', () => {

  it('creates a simple insert query', () => {
    const result = qg.insert('duck')({
      size: 3,
      color: 'grey',
    })
    const expected = `INSERT INTO duck (SIZE, COLOR) VALUES (3, 'grey')`
    expect(result).toBe(expected)
  })

})

describe('QueryGenerator.update', () => {

  it('returns a function', () => {
    expect(typeof(qg.update('goose'))).toBe('function')
  })

})

describe('QueryGenerator.update(table)', () => {

  it('generates a simple update query', () => {
    const result = qg.update('goose')({
      props: {
        size: 5,
        color: 'grey',
      },
      where: [['id', '=', 2]]
    })

    const expected = `UPDATE goose SET SIZE = 5, COLOR = 'grey' WHERE ID = 2`

    expect(result).toBe(expected)
  })

})

describe('QueryGenerator.delete', () => {

  it('returns a function', () => {
    expect(typeof(qg.delete('goose'))).toBe('function')
  })

})

describe('QueryGenerator.delete(table)', () => {

  it('generates a simple delete query', () => {
    const result = qg.delete('duck')({
      where: [['id', '=', '2']]
    })

    const expected = `DELETE FROM duck WHERE ID = 2`

    expect(result).toBe(expected)
  })

})
