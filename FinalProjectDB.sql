-- address with auto-id
CREATE TABLE address (
  id NUMBER NOT NULL,
  streetaddress VARCHAR(256),
  city VARCHAR(256),
  state VARCHAR(2),
  zipcode VARCHAR(6),

  PRIMARY KEY (id)
);

CREATE SEQUENCE address_id_seq START WITH 1 INCREMENT BY 1;

CREATE OR REPLACE TRIGGER address_insert
BEFORE INSERT ON address
FOR EACH ROW
BEGIN
  SELECT address_id_seq.nextval INTO :new.id FROM dual;
END;

-- creditcard with auto-id
CREATE TABLE creditcard (
  id NUMBER NOT NULL,
  cardnumber VARCHAR(256),
  expiration VARCHAR(256),
  address NUMBER,
  FOREIGN KEY (address) REFERENCES address(id),
  PRIMARY KEY (id)
);

CREATE SEQUENCE creditcard_id_seq START WITH 1 INCREMENT BY 1;

CREATE OR REPLACE TRIGGER creditcard_insert
BEFORE INSERT ON creditcard
FOR EACH ROW
BEGIN
  SELECT creditcard_id_seq.nextval INTO :new.id FROM dual;
END;

-- customer with auto-id
CREATE TABLE customer (
  id NUMBER NOT NULL,
  name VARCHAR(256),
  balance NUMERIC(6,2) DEFAULT 0.00,

  PRIMARY KEY (id)
);

CREATE SEQUENCE customer_id_seq START WITH 1 INCREMENT BY 1;

CREATE OR REPLACE TRIGGER customer_insert
BEFORE INSERT ON customer
FOR EACH ROW
BEGIN
  SELECT customer_id_seq.nextval INTO :new.id FROM dual;
END;

-- order is a keyword, hence the name of the table for order, with auto-id as well
CREATE TABLE not_keyword_order (
  id NUMBER NOT NULL,
  status NUMBER NOT NULL,

  PRIMARY KEY (id)
);

CREATE SEQUENCE not_keyword_order_id_seq START WITH 1 INCREMENT BY 1;

CREATE OR REPLACE TRIGGER not_keyword_order_insert
BEFORE INSERT ON not_keyword_order
FOR EACH ROW
BEGIN
  SELECT not_keyword_order_id_seq.nextval INTO :new.id FROM dual;
END;

-- product with auto-id
CREATE TABLE product (
  id NUMBER NOT NULL,
  name VARCHAR(256),
  category VARCHAR(256),
  productsize NUMERIC(6,2),
  nutrition VARCHAR(256),
  alcoholcontent VARCHAR(256),
  stock NUMBER,
  price NUMERIC(6,2),

  PRIMARY KEY (id)
);

CREATE SEQUENCE product_id_seq START WITH 1 INCREMENT BY 1;

CREATE OR REPLACE TRIGGER product_insert
BEFORE INSERT ON product
FOR EACH ROW
BEGIN
  SELECT product_id_seq.nextval INTO :new.id FROM dual;
END;

-- internal shelf, which is used to store order information
CREATE TABLE shelf (
  product_id NUMBER NOT NULL,
  order_id NUMBER NOT NULL,
  quantity NUMBER NOT NULL,
  FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE,
  FOREIGN KEY (order_id) REFERENCES not_keyword_order(id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, order_id, quantity)
);

-- staff, with auto-id
CREATE TABLE staff (
  id NUMBER NOT NULL,
  name VARCHAR(256),
  title VARCHAR(256),
  salary NUMERIC(16,2),

  PRIMARY KEY (id)
);

CREATE SEQUENCE staff_id_seq START WITH 1 INCREMENT BY 1;

CREATE OR REPLACE TRIGGER staff_insert
BEFORE INSERT ON staff
FOR EACH ROW
BEGIN
  SELECT staff_id_seq.nextval INTO :new.id FROM dual;
END;

-- customer to address junction table
CREATE TABLE customer_address (
  customer_id NUMERIC NOT NULL,
  address_id NUMERIC NOT NULL,

  PRIMARY KEY (customer_id, address_id),

  FOREIGN KEY (customer_id) REFERENCES customer(id) ON DELETE CASCADE,
  FOREIGN KEY (address_id) REFERENCES address(id) ON DELETE CASCADE
);

-- customer to creditcard junction table
CREATE TABLE customer_creditcard (
  customer_id NUMERIC NOT NULL,
  creditcard_id NUMERIC NOT NULL,

  PRIMARY KEY (customer_id, creditcard_id),

  FOREIGN KEY (customer_id) REFERENCES customer(id) ON DELETE CASCADE,
  FOREIGN KEY (creditcard_id) REFERENCES creditcard(id) ON DELETE CASCADE
);

-- staff to address junction table
CREATE TABLE staff_address (
  staff_id NUMERIC NOT NULL,
  address_id NUMERIC NOT NULL,

  PRIMARY KEY (staff_id, address_id),

  FOREIGN KEY (staff_id) REFERENCES staff(id) ON DELETE CASCADE,
  FOREIGN KEY (address_id) REFERENCES address(id) ON DELETE CASCADE
);

-- customer to order junction table
CREATE TABLE customer_order (
  customer_id NUMERIC NOT NULL,
  order_id NUMERIC NOT NULL,

  PRIMARY KEY (customer_id, order_id),

  FOREIGN KEY (customer_id) REFERENCES customer(id) ON DELETE CASCADE,
  FOREIGN KEY (order_id) REFERENCES not_keyword_order(id) ON DELETE CASCADE
);
