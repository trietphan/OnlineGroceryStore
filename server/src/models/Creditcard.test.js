const Creditcard = require('./Creditcard')

describe('Creditcard model', () => {
  it('returns a query that creates a credit card on create()', () => {
    const result = Creditcard.create({
      cardnumber: '123412341234',
      expiration: '05/20',
    })
    const expected = `INSERT INTO creditcard (CARDNUMBER, EXPIRATION) VALUES ('123412341234', '05/20')`
    expect(result).toBe(expected)
  })

  it('returns a query that updates a credit card on update()', () => {
    const result = Creditcard.update(25, {
      expiration: '06/20',
    })
    const expected = `UPDATE creditcard SET EXPIRATION = '06/20' WHERE ID = 25`
    expect(result).toBe(expected)
  })

  it('returns a query that deletes a credit card on delete()', () => {
    const result = Creditcard.delete(20)
    const expected = `DELETE FROM creditcard WHERE ID = 20`
    expect(result).toBe(expected)
  })
})
