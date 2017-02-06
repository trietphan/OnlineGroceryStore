const Controller = require('./Controller')
const Product = require('../models/Product')
const db = require('../db/driver')

const handlers = {
  async onGet() {
    const result = await db.execute(Product.get())
    return result
  },

  async onPost({ name, category, productsize, nutrition, alcoholcontent, stock, price }) {
    await db.execute(Product.create({ name, category, productsize, nutrition, alcoholcontent, stock, price }))
    const products = await db.execute(Product.get() + ' ORDER BY id DESC')
    const createdProduct = products[0]

    return { id: createdProduct.id }
  },

  async onPut(id, { name, category, productsize, nutrition, alcoholcontent, stock, price }) {
    const result = await db.execute(Product.update(id, { name, category, productsize, nutrition, alcoholcontent, stock, price }))
    return { id }
  },

  async onDelete(id) {
    await db.execute(Product.delete(id))
    return { id }
  },
}

const productController = new Controller(handlers)

module.exports = productController
