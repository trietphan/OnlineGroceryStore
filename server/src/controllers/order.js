const Controller = require('./Controller')

const Order = require('../models/Order')
const Shelf = require('../models/Shelf')
const Customer = require('../models/Customer')
const Product = require('../models/Product')

const db = require('../db/driver')
const { missingConnection } = require('../errorMessage')
const { zipWithIndex } = require('../utils')


function transformProduct(product) {
  return {
    id: product.product_id,
    name: product.name,
  }
}

async function getProductsByOrder (orders) {
  let productsByOrder = []
  for (let order of orders) {
    const productList = await db.execute(Order.getProducts(order))
    productsByOrder = productsByOrder.concat([productList])
  }

  return productsByOrder
}

function addProductsWithQuantities(productsByOrder) {
  return (order, i) => {
    return Object.assign(
      order,
      { products: productsByOrder[i].map(transformProduct) },
      { quantities: productsByOrder[i].map(p => p.quantity) }
    )
  }
}

const handlers = {
  async onGet() {
    const orders = await db.execute(Order.get())
    const productsByOrder = await getProductsByOrder(orders)

    return orders.map(addProductsWithQuantities(productsByOrder))
  },

  async onGetId(id) {
    const customer = { id }
    const ordersRes = await db.execute(Order.getOrdersForCustomer(customer))

    const orders = ordersRes.map(res => ({
      id: res.order_id,
      status: res.status,
    }))

    const productsByOrder = await getProductsByOrder(orders)
    return orders.map(addProductsWithQuantities(productsByOrder))
  },

  async onPost({ status, quantities, products, customer }) {
    await db.execute(Order.create({ status }))
    const orders = await db.execute(Order.get() + ' ORDER BY id DESC')
    const createdOrder = orders[0]

    if (quantities && products && customer) {
      await db.execute(Order.connectToCustomer(createdOrder, customer))

      const productsWithQuantities = products.map((p, i) => Object.assign({}, p, { quantity: quantities[i] }))

      for (let [product, idx] of zipWithIndex(productsWithQuantities)) {
        try {
          await db.execute(Product.decreaseStock(product, product.quantity), {}, { throwBack: true })
        } catch (err) {
          // stock is most likely negative. or not, but who cares :)
          await db.execute(Order.delete(createdOrder.id))

          for (let product of productsWithQuantities.slice(0, idx)) {
            await db.execute(Product.increaseStock(product, product.quantity))
          }

          return { message: 'Ordered products are not in stock, order was not placed.' }
        }

        await db.execute(Shelf.create({
          product,
          order: createdOrder,
          quantity: product.quantity,
        }))
      }

      const productsWithInfo = await db.execute(Order.getProducts(createdOrder))

      const orderPrice = productsWithInfo
            .map(p => ([p.price, p.quantity]))
            .reduce((sum, [price, quantity]) => sum + price * quantity, 0)

      await db.execute(Customer.charge(customer, orderPrice))
    } else {
      return missingConnection('quantities', 'products', 'customer')
    }

    return { id: createdOrder.id }
  },

  async onPut(id, { status, quantities, products, customer }) {
    const result = await db.execute(Order.update(id, { streetaddress, city, state, zipcode }))
    return { id }
  },

  async onDelete(id) {
    await db.execute(Order.delete(id))
    return { id }
  },
}

const orderController = new Controller(handlers)

module.exports = orderController
