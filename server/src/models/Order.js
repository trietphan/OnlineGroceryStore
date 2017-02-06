const qg = require('../db/queryGenerator')

class Order {
  constructor() {
    this.TABLE_NAME = 'not_keyword_order'
  }

  get dbprops () {
    return {
      table: this.TABLE_NAME,
      types: {
        id: 'NUMBER NOT NULL',
        status: 'NUMBER NOT NULL',
      },
      primary: ['id'],
    }
  }

  create({ status }) {
    return qg.insert(this.TABLE_NAME)({ status })
  }

  get(id) {
    if (id) {
      return qg.select(this.TABLE_NAME)({ where: [['id', '=', id]]})
    } else {
      return qg.select(this.TABLE_NAME)()
    }

  }

  update(id, { status }) {
    return qg.update(this.TABLE_NAME)({
      props: { status },
      where: [['id', '=', id]]
    })
  }

  delete(id) {
    return qg.delete(this.TABLE_NAME)({
      where: [['id', '=', id]]
    })
  }

  getProducts(order) {
    return qg.select(this.TABLE_NAME)({
      where: [[`${this.TABLE_NAME}.id`, '=', order.id]],
      join: [
        { table: 'shelf', on: [[`${this.TABLE_NAME}.id`, '=', 'shelf.order_id']]},
        { table: 'product', on: [['shelf.product_id', '=', 'product.id']]}
      ],
    })
  }

  getOrdersForCustomer(customer) {
    return qg.select(this.TABLE_NAME)({
      where: [['customer_id', '=', customer.id]],
      join: [
        { table: 'customer_order', on: [['customer_order.order_id', '=', `${this.TABLE_NAME}.id`]]},
      ],
    })
  }

  connectToCustomer(order, customer) {
    return `INSERT INTO customer_order (CUSTOMER_ID, ORDER_ID) VALUES (${customer.id}, ${order.id})`
  }

}

const order = new Order()

module.exports = order
