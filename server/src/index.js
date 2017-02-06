const db = require('./db/driver')
const express = require('express')
const logger = require('./logger')
const bodyParser = require('body-parser')
const cors = require('cors')
const errorHandler = require('./middleware/errorHandler')

const log = logger.log('top')
const app = express()

const PORT = 3003

const customerController = require('./controllers/customer')
const staffController = require('./controllers/staff')
const addressController = require('./controllers/address')
const creditcardController = require('./controllers/creditcard')
const productController = require('./controllers/product')
const orderController = require('./controllers/order')

function createRouter(name, controller) {
  const router = express.Router()

  router.get(`/${name}/`, controller.onGet())
  router.get(`/${name}/:id`, controller.onGetId())

  router.post(`/${name}`, controller.onPost())
  router.put(`/${name}/:id`, controller.onPut())
  router.delete(`/${name}/:id`, controller.onDelete())

  return router
}

;(async () => {
  await db.connect(msg => log(msg, 'green'))

  app.use(bodyParser.json())
  app.use(cors())

  app.use('/api', createRouter('customers', customerController))
  app.use('/api', createRouter('staff', staffController))
  app.use('/api', createRouter('addresses', addressController))
  app.use('/api', createRouter('creditcards', creditcardController))
  app.use('/api', createRouter('products', productController))
  app.use('/api', createRouter('orders', orderController))

  app.use(errorHandler)
  app.listen(PORT, _ => log(`started server on ${PORT}`))
})()
