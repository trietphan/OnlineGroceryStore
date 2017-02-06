const Controller = require('./Controller')
const Address = require('../models/Address')
const db = require('../db/driver')

const { missingConnection } = require('../errorMessage')

const handlers = {
  async onGet() {
    const result = await db.execute(Address.get())
    return result
  },

  async onPost({ streetaddress, city, state, zipcode, customer, staff }) {
    await db.execute(Address.create({ streetaddress, city, state, zipcode }))
    const addresses = await db.execute(Address.get() + ' ORDER BY id DESC')
    const createdAddress = addresses[0]

    if (customer) {
      await db.execute(Address.connectToCustomer(createdAddress, customer))
    } else if (staff) {
      await db.execute(Address.connectToStaff(createdAddress, staff))
    } else {
      return missingConnection('customer', 'staff')
    }

    return { id: createdAddress.id }
  },

  async onPut(id, { streetaddress, city, state, zipcode }) {
    const result = await db.execute(Address.update(id, { streetaddress, city, state, zipcode }))
    return { id }
  },

  async onDelete(id) {
    await db.execute(Address.delete(id))
    return { id }
  },
}

const addressController = new Controller(handlers)

module.exports = addressController
