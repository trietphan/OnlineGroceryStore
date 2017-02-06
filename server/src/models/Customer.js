const qg = require('../db/queryGenerator')

class Customer {
  constructor() {
    this.TABLE_NAME = 'customer'
  }

  get dbprops () {
    return {
      table: 'customer',
      types: {
        id: 'NUMBER NOT NULL',
        name: 'VARCHAR(256)',
        balance: 'NUMERIC(6,2) DEFAULT 0.00',
      },
      primary: ['id'],
    }
  }

  create({ name }) {
    return qg.insert(this.TABLE_NAME)({ name })
  }

  get(id) {
    if (id) {
      return qg.select(this.TABLE_NAME)({ where: [['id', '=', id]]})
    } else {
      return qg.select(this.TABLE_NAME)()
    }

  }

  update(id, { name }) {
    return qg.update(this.TABLE_NAME)({
      props: { name },
      where: [['id', '=', id]]
    })
  }

  delete(id) {
    return qg.delete(this.TABLE_NAME)({
      where: [['id', '=', id]]
    })
  }

  getAddresses(customer) {
    return qg.select('address')({
      where: [['customer_address.customer_id', '=', customer.id]],
      join: [{
        table: 'customer_address',
        on: [['customer_address.address_id', '=', 'address.id']]
      }]
    })
  }

  getCreditcards(customer) {
    return qg.select('creditcard')({
      where: [['customer_creditcard.customer_id', '=', customer.id]],
      join: [{
        table: 'customer_creditcard',
        on: [['customer_creditcard.creditcard_id', '=', 'creditcard.id']]
      }]
    })
  }

  charge(customer, amount) {
    // nah, screw that
    return `UPDATE ${this.TABLE_NAME} SET BALANCE = BALANCE + ${amount} WHERE ID = ${customer.id}`
  }
}

const customer = new Customer()

module.exports = customer
