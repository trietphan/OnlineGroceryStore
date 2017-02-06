const qg = require('../db/queryGenerator')

class Address {
  constructor() {
    this.TABLE_NAME = 'address'
  }

  get dbprops () {
    return {
      table: this.TABLE_NAME,
      types: {
        id: 'NUMBER NOT NULL',
        streetaddress: 'VARCHAR(256)',
        city: 'VARCHAR(256)',
        state: 'VARCHAR(2)',
        zipcode: 'VARCHAR(6)',
      },
      primary: ['id'],
    }
  }

  create({ streetaddress, city, state, zipcode }) {
    return qg.insert(this.TABLE_NAME)({ streetaddress, city, state, zipcode })
  }

  get() {
    return qg.select(this.TABLE_NAME)()
  }

  update(id, { streetaddress, city, state, zipcode }) {
    return qg.update(this.TABLE_NAME)({
      props: { streetaddress, city, state, zipcode },
      where: [['id', '=', id]]
    })
  }

  delete(id) {
    return qg.delete(this.TABLE_NAME)({
      where: [['id', '=', id]]
    })
  }

  connectToCustomer(address, customer) {
    return `INSERT INTO customer_address (CUSTOMER_ID, ADDRESS_ID) VALUES (${customer.id}, ${address.id})`
  }

  connectToStaff(address, staff) {
    return `INSERT INTO staff_address (STAFF_ID, ADDRESS_ID) VALUES (${staff.id}, ${address.id})`
  }
}

const address = new Address()

module.exports = address
