const Customer = require('./Customer')

describe('Customer model', () => {
  it('returns a query that creates a customer on create()', () => {
    const result = Customer.create({ name: 'John Doe' })
    const expected = `INSERT INTO customer (NAME) VALUES ('John Doe')`
    expect(result).toBe(expected)
  })

  it('returns a query that updates a customer on update()', () => {
    const result = Customer.update(13, {
      name: 'Jack Sparrow',
    })
    const expected = `UPDATE customer SET NAME = 'Jack Sparrow' WHERE ID = 13`
    expect(result).toBe(expected)
  })

  it('returns a query that deletes a customer on delete()', () => {
    const result = Customer.delete(13)
    const expected = `DELETE FROM customer WHERE ID = 13`
    expect(result).toBe(expected)
  })
})
