const Staff = require('../Staff')
const Customer = require('../Customer')
const Creditcard = require('../Creditcard')
const Address = require('../Address')
const Product = require('../Product')

const Order = require('../Order')
const Shelf = require('../Shelf')


const seed = [
  Staff.create({
    name: 'Hubert Farnsworth',
    title: 'Owner/Mad Scientist',
    salary: 90000,
  }),
  Staff.create({
    name: 'Bender',
    title: 'Lovable Rascal',
    salary: 50000,
  }),
  Staff.create({
    name: 'Turanga Leela',
    title: 'Captain',
    salary: 50000,
  }),
  Staff.create({
    name: 'Philip Fry',
    title: 'Delivery boy',
    salary: 30000,
  }),

  Customer.create({
    name: 'Hattie McDoogal',
  }),
  Customer.create({
    name: 'Bubblegum Tate',
  }),

  Address.create({
    streetaddress: '141 E 72nd Street',
    city: 'New New York',
    state: 'NY',
    zipcode: '10021',
  }),
  Address.connectToStaff({ id: 1 }, { id: 1 }),

  Address.create({
    streetaddress: '20 E pith Ave',
    city: 'New New York',
    state: 'NY',
    zipcode: '10021',
  }),
  Address.connectToStaff({ id: 2 }, { id: 2 }),

  Address.create({
    streetaddress: '34 E 120th Street',
    city: 'New New York',
    state: 'NY',
    zipcode: '10021',
  }),
  Address.connectToStaff({ id: 3 }, { id: 3 }),

  Address.create({
    streetaddress: '30 E 99th Street',
    city: 'New New York',
    state: 'NY',
    zipcode: '10021',
  }),
  Address.connectToCustomer({ id: 4 }, { id: 1 }),

  Address.create({
    streetaddress: '3 E 3rd Street',
    city: 'New New York',
    state: 'NY',
    zipcode: '10021',
  }),
  Address.connectToCustomer({ id: 5 }, { id: 2 }),

  Creditcard.create({
    cardnumber: '12341234123412341',
    expiration: '05/3024',
  }),
  Creditcard.connectToCustomer({ id: 1 }, { id: 1 }),
  Creditcard.connectToAddress({ id: 1 }, { id: 4 }),

  Creditcard.create({
    cardnumber: '12341234123412342',
    expiration: '02/3024',
  }),
  Creditcard.connectToCustomer({ id: 2 }, { id: 1 }),
  Creditcard.connectToAddress({ id: 2 }, { id: 4 }),

  Creditcard.create({
    cardnumber: '12341234123412342',
    expiration: '02/3024',
  }),
  Creditcard.connectToCustomer({ id: 3 }, { id: 2 }),
  Creditcard.connectToAddress({ id: 3 }, { id: 5 }),

  Product.create({
    name: 'Banana',
    category: 'Food',
    productsize: 25,
    nutrition: 'Yum!',
    stock: 200,
    price: 2,
  }),
  Product.create({
    name: 'Charleston Chew',
    category: 'Food',
    productsize: 50,
    nutrition: 'Delish!',
    stock: 50,
    price: 10,
  }),
  Product.create({
    name: 'It Sure Aint Butter!',
    category: 'Food',
    productsize: 5,
    nutrition: 'I CANT BELIEVE IT',
    stock: 20,
    price: 5,
  }),
  Product.create({
    name: 'Benderbrau',
    category: 'Alcohol',
    productsize: 20,
    alcoholcontent: 'Lets get drunk!',
    stock: 32,
    price: 16,
  }),

  Order.create({
    status: 0,
  }),
  Order.connectToCustomer({ id: 1 }, { id: 1 }),
  Shelf.create({
    product: { id: 2 },
    order: { id: 1 },
    quantity: 10,
  }),
  Shelf.create({
    product: { id: 4 },
    order: { id: 1 },
    quantity: 20,
  }),

  Order.create({
    status: 0,
  }),
  Order.connectToCustomer({ id: 2 }, { id: 1 }),
  Shelf.create({
    product: { id: 3 },
    order: { id: 2 },
    quantity: 1,
  }),

  Order.create({
    status: 0,
  }),
  Order.connectToCustomer({ id: 3 }, { id: 2 }),
  Shelf.create({
    product: { id: 2 },
    order: { id: 3 },
    quantity: 5,
  }),
  Shelf.create({
    product: { id: 1 },
    order: { id: 3 },
    quantity: 5,
  }),
]

module.exports = seed
