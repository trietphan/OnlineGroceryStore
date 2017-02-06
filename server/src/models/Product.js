const qg = require('../db/queryGenerator')

class Product {
  constructor() {
    this.TABLE_NAME = 'product'
  }

  get dbprops () {
    return {
      table: 'product',
      types: {
        id: 'NUMBER NOT NULL',
        name: 'VARCHAR(256)',
        category: 'VARCHAR(256)',
        productsize: 'NUMERIC(6,2)',
        nutrition: 'VARCHAR(256)',
        alcoholcontent: 'VARCHAR(256)',
        stock: 'NUMBER',
        price: 'NUMERIC(6,2)',
      },
      primary: ['id'],
    }
  }

  create({ name, category, productsize, nutrition, alcoholcontent, stock, price }) {
    return qg.insert(this.TABLE_NAME)({ name, category, productsize, nutrition, alcoholcontent, stock, price })
  }

  get(id) {
    if (id) {
      return qg.select(this.TABLE_NAME)({ where: [['id', '=', id]]})
    } else {
      return qg.select(this.TABLE_NAME)()
    }

  }

  update(id, { name, category, productsize, nutrition, alcoholcontent, stock, price }) {
    return qg.update(this.TABLE_NAME)({
      props: { name, category, productsize, nutrition, alcoholcontent, stock, price },
      where: [['id', '=', id]]
    })
  }

  delete(id) {
    return qg.delete(this.TABLE_NAME)({
      where: [['id', '=', id]]
    })
  }

  decreaseStock(product, amount) {
    return `UPDATE ${this.TABLE_NAME} SET STOCK = STOCK - ${amount} WHERE ID = ${product.id}`
  }

  increaseStock(product, amount) {
    return `UPDATE ${this.TABLE_NAME} SET STOCK = STOCK + ${amount} WHERE ID = ${product.id}`
  }
}

const product = new Product()

module.exports = product
