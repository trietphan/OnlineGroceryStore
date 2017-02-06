const createConstraints = [
  `ALTER TABLE product ADD CONSTRAINT non_negative_stock CHECK (stock >= 0)`,
]

module.exports = createConstraints
