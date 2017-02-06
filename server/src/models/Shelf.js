const qg = require('../db/queryGenerator')
const Order = require('./Order')

const Product = require('./Product')

class Shelf {
  constructor() {
    this.TABLE_NAME = 'shelf'
  }

  get dbprops () {
    return {
      table: this.TABLE_NAME,
      types: {
        product_id: 'NUMBER NOT NULL',
        order_id: 'NUMBER NOT NULL',
        quantity: 'NUMBER NOT NULL',
      },
      primary: ['product_id', 'order_id', 'quantity'],
      foreign: [
        ['product_id', `${Product.TABLE_NAME}(id) ON DELETE CASCADE`],
        ['order_id', `${Order.TABLE_NAME}(id) ON DELETE CASCADE`],
      ],
    }
  }

  create({ product, order, quantity }) {
    return qg.insert(this.TABLE_NAME)({
      product_id: product.id,
      order_id: order.id,
      quantity,
    })
  }

  delete(order_id) {
    return qg.delete(this.TABLE_NAME)({
      where: [['order_id', '=', order_id]]
    })
  }
}

const shelf = new Shelf()

module.exports = shelf
