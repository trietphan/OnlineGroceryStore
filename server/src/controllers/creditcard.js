const Controller = require('./Controller')
const Creditcard = require('../models/Creditcard')
const db = require('../db/driver')

const { missingConnection } = require('../errorMessage')

const handlers = {
  async onGet() {
    const result = await db.execute(Creditcard.get())
    return result
  },

  async onPost({ cardnumber, expiration, customer, address }) {
    await db.execute(Creditcard.create({ cardnumber, expiration }))
    const creditcards = await db.execute(Creditcard.get() + ' ORDER BY id DESC')
    const creditcard = creditcards[0]

    if (!(customer && address)) {
      return missingConnection('customer', 'address')
    }

    await db.execute(Creditcard.connectToAddress(creditcard, address))
    await db.execute(Creditcard.connectToCustomer(creditcard, customer))

    return creditcard
  },

  async onPut(id, { cardnumber, expiration }) {
    const result = await db.execute(Creditcard.update(id, { cardnumber, expiration }))
    return { id }
  },

  async onDelete(id) {
    await db.execute(Creditcard.delete(id))
    return { id }
  },
}

const creditcardController = new Controller(handlers)

module.exports = creditcardController
