const Controller = require('./Controller')
const Staff = require('../models/Staff')
const db = require('../db/driver')

const handlers = {
  async onGet() {
    const staff = await db.execute(Staff.get())
    return staff
  },

  async onGetId(id) {
    const staff = await db.execute(Staff.get(id))

    let staffMember = staff[0]

    const addressesRes = await db.execute(Staff.getAddresses(staffMember))
    const addresses = addressesRes.map(res => ({
      id: res.address_id,
      streetaddress: res.streetaddress,
      state: res.state,
      zipcode: res.zipcode,
      city: res.city,
    }))

    staffMember.addresses = addresses

    return staffMember
  },

  async onPost({ name, title, salary }) {
    await db.execute(Staff.create({ name }))
    // get the latest generated id, THANKS ORACLEDB for not being able to return it
    const result = await db.execute(Staff.get() + ' ORDER BY id DESC')
    // and thanks for not supporting LIMIT
    return result[0]
  },

  async onPut(id, { name, title, salary }) {
    const result = await db.execute(Staff.update(id, { name }))
    return { id }
  },

  async onDelete(id) {
    await db.execute(Staff.delete(id))
    return { id }
  },
}

const staffController = new Controller(handlers)

module.exports = staffController
