const qg = require('../db/queryGenerator')

class Creditcard {
  constructor() {
    this.TABLE_NAME = 'creditcard'
  }

  get dbprops () {
    return {
      table: this.TABLE_NAME,
      types: {
        id: 'NUMBER NOT NULL',
        cardnumber: 'VARCHAR(256)',
        expiration: 'VARCHAR(256)',
        address: 'NUMBER',
      },
      primary: ['id'],
      foreign: [
        ['address', 'address(id)'],
      ],
    }
  }

  create({ cardnumber, expiration }) {
    return qg.insert(this.TABLE_NAME)({ cardnumber, expiration })
  }

  get() {
    return qg.select(this.TABLE_NAME)()
  }

  update(id, { cardnumber, expiration }) {
    return qg.update(this.TABLE_NAME)({
      props: { cardnumber, expiration },
      where: [['id', '=', id]]
    })
  }

  delete(id) {
    return qg.delete(this.TABLE_NAME)({
      where: [['id', '=', id]]
    })
  }

  connectToAddress(creditcard, address) {
    return `UPDATE ${this.TABLE_NAME} SET ADDRESS = ${address.id} WHERE ${this.TABLE_NAME}.id = ${creditcard.id}`
  }

  connectToCustomer(creditcard, customer) {
    return `INSERT INTO customer_creditcard (CUSTOMER_ID, CREDITCARD_ID) VALUES (${customer.id}, ${creditcard.id})`
  }
}

const creditcard = new Creditcard()

module.exports = creditcard
