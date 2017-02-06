const Address = require('./Address')

describe('Address model', () => {
  it('returns a query that creates an address on create()', () => {
    const result = Address.create({
      streetaddress: '123 South Boulevard',
      city: 'London',
      state: 'OH',
      zipcode: '43140',
    })
    const expected = `INSERT INTO address (STREETADDRESS, CITY, STATE, ZIPCODE) VALUES ('123 South Boulevard', 'London', 'OH', '43140')`
    expect(result).toBe(expected)
  })

  it('returns a query that updates an address on update()', () => {
    const result = Address.update(25, {
      streetaddress: '123 North Boulevard',
    })
    const expected = `UPDATE address SET STREETADDRESS = '123 North Boulevard' WHERE ID = 25`
    expect(result).toBe(expected)
  })

  it('returns a query that deletes an address on delete()', () => {
    const result = Address.delete(10)
    const expected = `DELETE FROM address WHERE ID = 10`
    expect(result).toBe(expected)
  })

  it('returns a query that gets all addresses on get()', () => {
    const result = Address.get()
    const expected = `SELECT * FROM address`
    expect(result).toBe(expected)
  })
})
