const Product = require('./Product')

describe('Product model', () => {
  it('returns a query that creates a product on create()', () => {
    const result = Product.create({
      name: 'Banana',
      category: 'food',
      productsize: 10,
      nutrition: 'the best',
      stock: 20,
      price: 1,
    })
    const expected = `INSERT INTO product (NAME, CATEGORY, PRODUCTSIZE, NUTRITION, STOCK, PRICE) VALUES ('Banana', 'food', 10, 'the best', 20, 1)`
    expect(result).toBe(expected)
  })

  it('returns a query that updates an product on update()', () => {
    const result = Product.update(25, {
      nutrition: 'pretty good',
    })
    const expected = `UPDATE product SET NUTRITION = 'pretty good' WHERE ID = 25`
    expect(result).toBe(expected)
  })

  it('returns a query that deletes an product on delete()', () => {
    const result = Product.delete(10)
    const expected = `DELETE FROM product WHERE ID = 10`
    expect(result).toBe(expected)
  })

  it('returns a query that gets all productes on get()', () => {
    const result = Product.get()
    const expected = `SELECT * FROM product`
    expect(result).toBe(expected)
  })
})
