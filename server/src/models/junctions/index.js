const createJunctions = [`
CREATE TABLE customer_address (
  customer_id NUMERIC NOT NULL,
  address_id NUMERIC NOT NULL,

  PRIMARY KEY (customer_id, address_id),

  FOREIGN KEY (customer_id) REFERENCES customer(id) ON DELETE CASCADE,
  FOREIGN KEY (address_id) REFERENCES address(id) ON DELETE CASCADE
)`, `
CREATE TABLE customer_creditcard (
  customer_id NUMERIC NOT NULL,
  creditcard_id NUMERIC NOT NULL,

  PRIMARY KEY (customer_id, creditcard_id),

  FOREIGN KEY (customer_id) REFERENCES customer(id) ON DELETE CASCADE,
  FOREIGN KEY (creditcard_id) REFERENCES creditcard(id) ON DELETE CASCADE
)`, `
CREATE TABLE staff_address (
  staff_id NUMERIC NOT NULL,
  address_id NUMERIC NOT NULL,

  PRIMARY KEY (staff_id, address_id),

  FOREIGN KEY (staff_id) REFERENCES staff(id) ON DELETE CASCADE,
  FOREIGN KEY (address_id) REFERENCES address(id) ON DELETE CASCADE
)`, `
CREATE TABLE customer_order (
  customer_id NUMERIC NOT NULL,
  order_id NUMERIC NOT NULL,

  PRIMARY KEY (customer_id, order_id),

  FOREIGN KEY (customer_id) REFERENCES customer(id) ON DELETE CASCADE,
  FOREIGN KEY (order_id) REFERENCES not_keyword_order(id) ON DELETE CASCADE
)`]

const teardownJunctions = createJunctions
      .map(q => q.split(' ')[2])
      .map(table => `DROP TABLE ${table}`)

module.exports = {
  createJunctions,
  teardownJunctions,
}
