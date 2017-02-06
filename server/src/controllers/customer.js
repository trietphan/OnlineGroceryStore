const Controller = require('./Controller')
const Customer = require('../models/Customer')
const db = require('../db/driver')

const handlers = {
  async onGet() {
    const customers = await db.execute(Customer.get())
    return customers
  },

  async onGetId(id) {
    const customers = await db.execute(Customer.get(id))

    let customer = customers[0]

    const addressesRes = await db.execute(Customer.getAddresses(customer))
    const addresses = addressesRes.map(res => ({
      id: res.address_id,
      streetaddress: res.streetaddress,
      state: res.state,
      zipcode: res.zipcode,
      city: res.city,
    }))

    const creditcardsRes = await db.execute(Customer.getCreditcards(customer))
    const creditcards = creditcardsRes.map(res => ({
      id: res.creditcard_id,
      cardnumber: res.cardnumber,
      expiration: res.expiration,
      address: addresses.find(a => a.id == res.address),
    }))

    customer.addresses = addresses
    customer.creditcards = creditcards
    return customer
  },

  async onPost({ name }) {
    await db.execute(Customer.create({ name }))
    // get the latest generated id, THANKS ORACLEDB for not being able to return it
    const result = await db.execute(Customer.get() + ' ORDER BY id DESC')
    // and thanks for not supporting LIMIT
    return result[0]
  },

  async onPut(id, { name }) {
    const result = await db.execute(Customer.update(id, { name }))
    return { id }
  },

  async onDelete(id) {
    await db.execute(Customer.delete(id))
    return { id }
  },
}

const customerController = new Controller(handlers)

module.exports = customerController
